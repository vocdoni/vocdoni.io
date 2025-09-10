import type { Config } from "vike/types";
import vikeReact from "vike-react/config";
import Layout from "../layouts/LayoutDefault.js";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "Vocdoni - Blockchain Voting Technology",
  description:
    "Cutting-edge blockchain technology powering the future of democratic participation with transparent, secure, and accessible voting infrastructure.",

  extends: vikeReact,
} satisfies Config;
