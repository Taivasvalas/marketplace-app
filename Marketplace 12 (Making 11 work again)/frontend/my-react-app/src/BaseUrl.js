// apiConfig.js
// export const BASE_URL80 = "http://localhost:8080";
// export const BASE_URL81 = "http://localhost:8081";


// export const BASE_URL80 = "/api80";
// export const BASE_URL81 = "/api81";



// Kun kehität lokaalisti, frontendi käyttää setupProxy.js:ssä määriteltyjä proxypolkuja.
// Kun projekti on buildattu Verceliin, se käyttää suoraan julkisia ngrok-URL:eja.



const isProd = process.env.NODE_ENV === "production";

export const BASE_URL80 = isProd
  ? "https://d73f-194-197-64-102.ngrok-free.app"
  : "/api80";

export const BASE_URL81 = isProd
  ? "https://1dd6-194-197-64-102.ngrok-free.app"
  : "/api81";
