import { GoogleGenerativeAI } from 'npm:@google/generative-ai@0.2.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface AnalysisResult {
  title: string;
  category: string;
  subcategory: string;
  condition: string;
  tags: string[];
  description: string;
  confidence: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Image URL is required' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Get Gemini API key from environment
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Fetch the image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));

    // Create the prompt for product analysis
    const prompt = `
Analyze this product image and extract the following information in JSON format:

{
  "title": "A descriptive product title (max 70 characters)",
  "category": "One of: electronics, gaming, vehicles, property, fashion, jobs, services, furniture, babies, sports, books, pets",
  "subcategory": "A specific subcategory based on the category",
  "condition": "One of: New, Used - Like New, Used - Good, Used - Fair",
  "tags": ["relevant", "product", "tags"],
  "description": "A detailed product description (50-200 words)",
  "confidence": 0.85
}

Categories and their subcategories:
- electronics: Phones & Tablets, Computers & Laptops, TVs & Audio, Cameras & Photography, Gaming Consoles, Smart Watches, Headphones & Earbuds, Accessories & Cables, Home Appliances, Security Systems
- gaming: PlayStation Games, Xbox Games, Nintendo Games, PC Games, Mobile Games, Gaming Accessories, Controllers & Joysticks, Gaming Chairs, VR Headsets, Retro Games & Consoles
- vehicles: Cars, Motorcycles & Scooters, Trucks & Commercial, Buses & Minibuses, Bicycles, Auto Parts & Accessories, Tires & Wheels, Car Audio & Electronics, Boats & Marine, Heavy Equipment
- property: Houses for Sale, Apartments for Sale, Houses for Rent, Apartments for Rent, Land & Plots, Commercial Property, Short Lets, Office Spaces, Warehouses, Event Centers
- fashion: Men's Clothing, Women's Clothing, Children's Clothing, Shoes & Footwear, Bags & Luggage, Jewelry & Accessories, Watches, Sunglasses, Traditional Wear, Vintage & Thrift
- jobs: Full-time Jobs, Part-time Jobs, Contract & Temporary, Internships, Remote Work, Sales & Marketing, IT & Technology, Healthcare, Education & Training, Customer Service
- services: Home Repair & Maintenance, Cleaning Services, Private Lessons & Tutoring, Health & Beauty Services, Building & Construction, Event Planning, Photography & Videography, Transportation Services, Legal Services, Business Services
- furniture: Living Room Furniture, Bedroom Furniture, Kitchen & Dining, Office Furniture, Home Appliances, Garden & Outdoor, Home Decor, Lighting, Storage & Organization, Tools & Hardware
- babies: Baby Clothes (0-2 years), Children Clothes (3-12 years), Toys & Games, Baby Gear & Strollers, Car Seats & Safety, Feeding & Nursing, Baby Furniture, Educational Toys, Sports & Outdoor Play, Books & Learning Materials
- sports: Gym Equipment, Football & Soccer, Basketball, Tennis & Racquet Sports, Swimming & Water Sports, Cycling, Running & Athletics, Boxing & Martial Arts, Outdoor & Camping, Sports Apparel
- books: Textbooks & Education, Fiction & Literature, Business & Finance, Health & Wellness, Children's Books, Religious & Spiritual, DVDs & Movies, Music & CDs, Magazines, E-books & Digital
- pets: Dogs, Cats, Birds, Fish & Aquarium, Small Pets (Rabbits, etc.), Pet Food & Supplies, Pet Accessories, Pet Services, Livestock, Pet Health & Veterinary

Guidelines:
- Be specific and accurate in your analysis
- Consider brand names, model numbers, and visible features
- Assess condition based on visible wear, packaging, etc.
- Generate relevant tags for searchability
- Set confidence based on image clarity and recognizability
- Return ONLY valid JSON, no additional text

Analyze this image:
`;

    // Prepare the image data for Gemini
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: imageResponse.headers.get('content-type') || 'image/jpeg',
      },
    };

    // Generate content with Gemini
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let analysisResult: AnalysisResult;
    try {
      // Clean the response text to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      analysisResult = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Validate the response structure
    if (!analysisResult.title || !analysisResult.category || !analysisResult.subcategory) {
      throw new Error('Invalid response structure from AI');
    }

    // Ensure confidence is a number between 0 and 1
    if (typeof analysisResult.confidence !== 'number' || analysisResult.confidence < 0 || analysisResult.confidence > 1) {
      analysisResult.confidence = 0.7; // Default confidence
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: analysisResult,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error analyzing image:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to analyze image',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});