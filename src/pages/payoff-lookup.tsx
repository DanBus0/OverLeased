import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, ArrowLeft, Search, Phone } from "lucide-react";
import Link from "next/link";

interface FinanceCompany {
  company: string;
  phone: string;
}

export default function PayoffLookupPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState<FinanceCompany[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<FinanceCompany[]>([]);

  useEffect(() => {
    // Multiple approaches to ensure scroll to top
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();

    // Scroll after a short delay to handle any layout shifts
    const timeoutId = setTimeout(scrollToTop, 100);

    // Listen for route changes
    const handleRouteChange = () => {
      scrollToTop();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      clearTimeout(timeoutId);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // Load CSV data from the uploaded file
    const loadCSVData = async () => {
      try {
        const response = await fetch('/full-lease-payoff-phone-numbers-verified-md0l4o1f.csv');
        const csvText = await response.text();
        
        // Parse CSV data
        const lines = csvText.trim().split('\n');
        
        const csvData: FinanceCompany[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(value => value.trim().replace(/"/g, ''));
          if (values.length >= 2 && values[0] && values[1]) {
            let phoneNumber = values[1].replace(/\?/g, '-');
            // Add "1-" prefix if it doesn't already start with "1-"
            if (!phoneNumber.startsWith('1-')) {
              phoneNumber = '1-' + phoneNumber;
            }
            csvData.push({
              company: values[0],
              phone: phoneNumber
            });
          }
        }
        
        setCompanies(csvData);
        setFilteredCompanies(csvData);
      } catch (error) {
        console.error('Error loading CSV ', error);
        // Fallback to mock data if CSV loading fails
        const mockData: FinanceCompany[] = [
          { company: "Toyota Financial Services", phone: "1-800-874-8822" },
          { company: "Honda Financial Services", phone: "1-800-708-6555" },
          { company: "BMW Financial Services", phone: "1-800-578-5000" },
          { company: "Mercedes-Benz Financial Services", phone: "1-800-654-6222" },
          { company: "Audi Financial Services", phone: "1-800-723-2834" }
        ];
        setCompanies(mockData);
        setFilteredCompanies(mockData);
      }
    };

    loadCSVData();
  }, []);

  useEffect(() => {
    // Filter companies based on search term
    const filtered = companies.filter(company =>
      company.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, companies]);

  useEffect(() => {
    // Handle finance query parameter
    const { finance } = router.query;
    if (finance && typeof finance === "string") {
      setSearchTerm(finance);
      
      // Scroll to matching row after a delay
      setTimeout(() => {
        const matchingRow = document.querySelector(`[data-company*="${finance.toLowerCase()}"]`);
        if (matchingRow) {
          matchingRow.scrollIntoView({ behavior: "smooth", block: "center" });
          matchingRow.classList.add("bg-blue-50", "border-blue-200");
        }
      }, 500);
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Lease Payoff Phone Number Lookup | OverLeased</title>
        <meta name="description" content="Find lease payoff phone numbers for auto finance companies. Search by company name to quickly locate contact information." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 rounded-lg p-2">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">OverLeased</span>
              </Link>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Lease Payoff Phone Number Lookup</CardTitle>
              <p className="text-blue-100 mt-2">
                Find the lease payoff phone number for your auto finance company. 
                Search by company name to quickly locate the contact information you need.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              {/* Helpful Note */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> You may also contact your auto finance company by searching online for the customer service phone number.
                </p>
              </div>

              {/* Search Input */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search finance companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-lg py-3 border-2 border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {filteredCompanies.length > 0 ? (
                    <div className="space-y-3">
                      {filteredCompanies.map((company, index) => (
                        <div
                          key={index}
                          data-company={company.company.toLowerCase()}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {company.company}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-blue-600" />
                              <a
                                href={`tel:${company.phone}`}
                                className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                              >
                                {company.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        No finance companies found matching "{searchTerm}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Count */}
              {searchTerm && (
                <div className="mt-6 text-center text-gray-600">
                  Showing {filteredCompanies.length} of {companies.length} companies
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
