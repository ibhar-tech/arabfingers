import { permanentRedirect } from "next/navigation";

// 308 permanent (not the default 307) so Google consolidates "/" → "/en"
// instead of treating the locale root as temporary.
export default function Home() {
  permanentRedirect("/en");
}
