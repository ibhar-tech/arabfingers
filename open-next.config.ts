import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Without an incremental cache the Worker cannot serve the prerendered HTML,
  // so every page came back `Cache-Control: private, no-cache, no-store` and was
  // rendered per request — the TTFB problem PageSpeed was flagging.
  //
  // This override reads prerendered pages straight from the Worker's static
  // assets. Every page here is fully static (no revalidate, no ISR), so it needs
  // no R2 bucket and no KV namespace.
  // ponytail: move to r2IncrementalCache only if a route ever needs on-demand
  // revalidation — none currently do.
  incrementalCache: staticAssetsIncrementalCache,
});
