import NextAuth from "next-auth";
import { Options } from "./authOptions";

const handler = NextAuth(Options);
export { handler as GET, handler as POST };