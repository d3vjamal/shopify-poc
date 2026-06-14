import crypto from "crypto";

export default async (req, context) => {
    // 1. Guardrail: Block non-POST traffic
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const rawBody = await req.text();
        const hmacHeader = req.headers.get("X-Shopify-Hmac-Sha256");

        // 2. Validate cryptographic X-Shopify-Hmac-Sha256 signature
        const generatedHmac = crypto
            .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
            .update(rawBody, "utf8")
            .digest("base64");

        if (!hmacHeader || !crypto.timingSafeEqual(Buffer.from(generatedHmac), Buffer.from(hmacHeader))) {
            console.error("⚠️ Security check failed! Webhook request source unverified.");
            return new Response(JSON.stringify({ error: "Unauthorized Signature" }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 3. Parse and trace the verified Shopify checkout payload
        const shopifyOrder = JSON.parse(rawBody);

        console.log("=================== 🚀 INTERNAL TRIGGER CAPTURED ===================");
        console.log(`Folder Path: netlify/functions-internal/`);
        console.log(`Order Reference: #${shopifyOrder.order_number}`);
        console.log(`Customer Contact: ${shopifyOrder.email}`);
        console.log(`Total Billing value: ${shopifyOrder.currency} ${shopifyOrder.total_price}`);
        console.log("====================================================================");

        // 4. Return an instant completion confirmation to Shopify
        return new Response(JSON.stringify({
            message: "Internal folder webhook triggered! Mock data logged safely.",
            capturedOrderNumber: shopifyOrder.order_number
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("❌ Processing Exception:", error.message);
        return new Response(JSON.stringify({ error: "Internal Server Processing Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};