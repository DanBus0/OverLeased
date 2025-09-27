
// @ts-nocheck

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface BrevoContactData {
  email: string;
  first_name: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    // Get the request body
    const body = await req.json()
    const { email, first_name, vehicle_make, vehicle_model, vehicle_year }: BrevoContactData = body

    // Validate required fields
    if (!email || !first_name || !vehicle_make || !vehicle_model || !vehicle_year) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: email, first_name, vehicle_make, vehicle_model, vehicle_year" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    // Get Brevo API key from environment
    const brevoApiKey = Deno.env.get("BREVO_API_KEY")
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY environment variable not set")
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    // Prepare contact data for Brevo
    const contactData = {
      email: email,
      attributes: {
        FIRSTNAME: first_name,
        VEHICLE_MAKE: vehicle_make,
        VEHICLE_MODEL: vehicle_model,
        VEHICLE_YEAR: vehicle_year.toString()
      },
      updateEnabled: true // This will update the contact if it already exists
    }

    console.log("Sending contact data to Brevo:", contactData)

    // Send request to Brevo API
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey
      },
      body: JSON.stringify(contactData)
    })

    const brevoResponseData = await brevoResponse.json()

    if (!brevoResponse.ok) {
      console.error("Brevo API error:", brevoResponse.status, brevoResponseData)
      
      // Handle specific Brevo error cases
      if (brevoResponse.status === 400 && brevoResponseData.code === "duplicate_parameter") {
        // Contact already exists, this is actually success for our use case
        console.log("Contact already exists in Brevo, updated successfully")
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Contact updated successfully in Brevo",
            brevo_response: brevoResponseData
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        )
      }
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to add contact to Brevo",
          details: brevoResponseData
        }),
        { 
          status: brevoResponse.status, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    console.log("Successfully added/updated contact in Brevo:", brevoResponseData)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact added successfully to Brevo",
        brevo_response: brevoResponseData
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    )

  } catch (error) {
    console.error("Error in add-to-brevo function:", error)
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    )
  }
})
