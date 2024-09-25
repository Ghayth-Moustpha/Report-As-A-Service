import puppeteer from 'puppeteer';

// Define the request handler type
export async function POST(req: Request): Promise<Response> {
    try {
        const { url }: { url: string } = await req.json();  // Parse the request body

        if (!url) {
            return new Response(JSON.stringify({ error: 'URL is required' }), {
                status: 400,
            });
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
        await browser.close();

        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="document.pdf"',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
            status: 500,
        });
    }
}
