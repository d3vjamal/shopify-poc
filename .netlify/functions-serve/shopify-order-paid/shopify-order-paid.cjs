var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .netlify/v1/functions/shopify-order-paid.js
var shopify_order_paid_exports = {};
__export(shopify_order_paid_exports, {
  default: () => shopify_order_paid_default
});
module.exports = __toCommonJS(shopify_order_paid_exports);
var import_crypto = __toESM(require("crypto"));
var shopify_order_paid_default = async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const rawBody = await req.text();
    const hmacHeader = req.headers.get("X-Shopify-Hmac-Sha256");
    const generatedHmac = import_crypto.default.createHmac("sha256", process.env.SHOPIFY_API_SECRET).update(rawBody, "utf8").digest("base64");
    if (!hmacHeader || !import_crypto.default.timingSafeEqual(Buffer.from(generatedHmac), Buffer.from(hmacHeader))) {
      console.error("\u26A0\uFE0F Security check failed! Webhook request source unverified.");
      return new Response(JSON.stringify({ error: "Unauthorized Signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const shopifyOrder = JSON.parse(rawBody);
    console.log("=================== \u{1F680} INTERNAL TRIGGER CAPTURED ===================");
    console.log(`Folder Path: netlify/functions-internal/`);
    console.log(`Order Reference: #${shopifyOrder.order_number}`);
    console.log(`Customer Contact: ${shopifyOrder.email}`);
    console.log(`Total Billing value: ${shopifyOrder.currency} ${shopifyOrder.total_price}`);
    console.log("====================================================================");
    return new Response(JSON.stringify({
      message: "Internal folder webhook triggered! Mock data logged safely.",
      capturedOrderNumber: shopifyOrder.order_number
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("\u274C Processing Exception:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Processing Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLm5ldGxpZnkvdjEvZnVuY3Rpb25zL3Nob3BpZnktb3JkZXItcGFpZC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIGNvbnRleHQpID0+IHtcbiAgICAvLyAxLiBHdWFyZHJhaWw6IEJsb2NrIG5vbi1QT1NUIHRyYWZmaWNcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiIH0pLCB7XG4gICAgICAgICAgICBzdGF0dXM6IDQwNSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByYXdCb2R5ID0gYXdhaXQgcmVxLnRleHQoKTtcbiAgICAgICAgY29uc3QgaG1hY0hlYWRlciA9IHJlcS5oZWFkZXJzLmdldChcIlgtU2hvcGlmeS1IbWFjLVNoYTI1NlwiKTtcblxuICAgICAgICAvLyAyLiBWYWxpZGF0ZSBjcnlwdG9ncmFwaGljIFgtU2hvcGlmeS1IbWFjLVNoYTI1NiBzaWduYXR1cmVcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVkSG1hYyA9IGNyeXB0b1xuICAgICAgICAgICAgLmNyZWF0ZUhtYWMoXCJzaGEyNTZcIiwgcHJvY2Vzcy5lbnYuU0hPUElGWV9BUElfU0VDUkVUKVxuICAgICAgICAgICAgLnVwZGF0ZShyYXdCb2R5LCBcInV0ZjhcIilcbiAgICAgICAgICAgIC5kaWdlc3QoXCJiYXNlNjRcIik7XG5cbiAgICAgICAgaWYgKCFobWFjSGVhZGVyIHx8ICFjcnlwdG8udGltaW5nU2FmZUVxdWFsKEJ1ZmZlci5mcm9tKGdlbmVyYXRlZEhtYWMpLCBCdWZmZXIuZnJvbShobWFjSGVhZGVyKSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTI2QTBcdUZFMEYgU2VjdXJpdHkgY2hlY2sgZmFpbGVkISBXZWJob29rIHJlcXVlc3Qgc291cmNlIHVudmVyaWZpZWQuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBcIlVuYXV0aG9yaXplZCBTaWduYXR1cmVcIiB9KSwge1xuICAgICAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAzLiBQYXJzZSBhbmQgdHJhY2UgdGhlIHZlcmlmaWVkIFNob3BpZnkgY2hlY2tvdXQgcGF5bG9hZFxuICAgICAgICBjb25zdCBzaG9waWZ5T3JkZXIgPSBKU09OLnBhcnNlKHJhd0JvZHkpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PSBcdUQ4M0RcdURFODAgSU5URVJOQUwgVFJJR0dFUiBDQVBUVVJFRCA9PT09PT09PT09PT09PT09PT09XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhgRm9sZGVyIFBhdGg6IG5ldGxpZnkvZnVuY3Rpb25zLWludGVybmFsL2ApO1xuICAgICAgICBjb25zb2xlLmxvZyhgT3JkZXIgUmVmZXJlbmNlOiAjJHtzaG9waWZ5T3JkZXIub3JkZXJfbnVtYmVyfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgQ3VzdG9tZXIgQ29udGFjdDogJHtzaG9waWZ5T3JkZXIuZW1haWx9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUb3RhbCBCaWxsaW5nIHZhbHVlOiAke3Nob3BpZnlPcmRlci5jdXJyZW5jeX0gJHtzaG9waWZ5T3JkZXIudG90YWxfcHJpY2V9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG5cbiAgICAgICAgLy8gNC4gUmV0dXJuIGFuIGluc3RhbnQgY29tcGxldGlvbiBjb25maXJtYXRpb24gdG8gU2hvcGlmeVxuICAgICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW50ZXJuYWwgZm9sZGVyIHdlYmhvb2sgdHJpZ2dlcmVkISBNb2NrIGRhdGEgbG9nZ2VkIHNhZmVseS5cIixcbiAgICAgICAgICAgIGNhcHR1cmVkT3JkZXJOdW1iZXI6IHNob3BpZnlPcmRlci5vcmRlcl9udW1iZXJcbiAgICAgICAgfSksIHtcbiAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9XG4gICAgICAgIH0pO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlx1Mjc0QyBQcm9jZXNzaW5nIEV4Y2VwdGlvbjpcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgUHJvY2Vzc2luZyBFcnJvclwiIH0pLCB7XG4gICAgICAgICAgICBzdGF0dXM6IDUwMCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxuICAgICAgICB9KTtcbiAgICB9XG59OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUFtQjtBQUVuQixJQUFPLDZCQUFRLE9BQU8sS0FBSyxZQUFZO0FBRW5DLE1BQUksSUFBSSxXQUFXLFFBQVE7QUFDdkIsV0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLEVBQUUsT0FBTyxxQkFBcUIsQ0FBQyxHQUFHO0FBQUEsTUFDakUsUUFBUTtBQUFBLE1BQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxJQUNsRCxDQUFDO0FBQUEsRUFDTDtBQUVBLE1BQUk7QUFDQSxVQUFNLFVBQVUsTUFBTSxJQUFJLEtBQUs7QUFDL0IsVUFBTSxhQUFhLElBQUksUUFBUSxJQUFJLHVCQUF1QjtBQUcxRCxVQUFNLGdCQUFnQixjQUFBQSxRQUNqQixXQUFXLFVBQVUsUUFBUSxJQUFJLGtCQUFrQixFQUNuRCxPQUFPLFNBQVMsTUFBTSxFQUN0QixPQUFPLFFBQVE7QUFFcEIsUUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFBQSxRQUFPLGdCQUFnQixPQUFPLEtBQUssYUFBYSxHQUFHLE9BQU8sS0FBSyxVQUFVLENBQUMsR0FBRztBQUM3RixjQUFRLE1BQU0sd0VBQThEO0FBQzVFLGFBQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxFQUFFLE9BQU8seUJBQXlCLENBQUMsR0FBRztBQUFBLFFBQ3JFLFFBQVE7QUFBQSxRQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsTUFDbEQsQ0FBQztBQUFBLElBQ0w7QUFHQSxVQUFNLGVBQWUsS0FBSyxNQUFNLE9BQU87QUFFdkMsWUFBUSxJQUFJLDZFQUFzRTtBQUNsRixZQUFRLElBQUksMENBQTBDO0FBQ3RELFlBQVEsSUFBSSxxQkFBcUIsYUFBYSxZQUFZLEVBQUU7QUFDNUQsWUFBUSxJQUFJLHFCQUFxQixhQUFhLEtBQUssRUFBRTtBQUNyRCxZQUFRLElBQUksd0JBQXdCLGFBQWEsUUFBUSxJQUFJLGFBQWEsV0FBVyxFQUFFO0FBQ3ZGLFlBQVEsSUFBSSxzRUFBc0U7QUFHbEYsV0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVO0FBQUEsTUFDL0IsU0FBUztBQUFBLE1BQ1QscUJBQXFCLGFBQWE7QUFBQSxJQUN0QyxDQUFDLEdBQUc7QUFBQSxNQUNBLFFBQVE7QUFBQSxNQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsSUFDbEQsQ0FBQztBQUFBLEVBRUwsU0FBUyxPQUFPO0FBQ1osWUFBUSxNQUFNLGdDQUEyQixNQUFNLE9BQU87QUFDdEQsV0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLEVBQUUsT0FBTyxtQ0FBbUMsQ0FBQyxHQUFHO0FBQUEsTUFDL0UsUUFBUTtBQUFBLE1BQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxJQUNsRCxDQUFDO0FBQUEsRUFDTDtBQUNKOyIsCiAgIm5hbWVzIjogWyJjcnlwdG8iXQp9Cg==
