declare module "bun" {
  interface Env {
    SUPABASE_URL: string;
    SUPABASE_ANON: string;
  }
}
