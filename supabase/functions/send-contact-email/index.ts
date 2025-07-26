import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, service, message }: ContactFormRequest = await req.json();

    // Send email to Hello Wash
    const emailResponse = await resend.emails.send({
      from: "Formulaire Contact <onboarding@resend.dev>",
      to: ["contact@hellowash.fr"],
      subject: `Nouvelle demande de devis - ${service}`,
      html: `
        <h1>Nouvelle demande de devis</h1>
        <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service souhaité:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Hello Wash <onboarding@resend.dev>",
      to: [email],
      subject: "Votre demande de devis a été reçue",
      html: `
        <h1>Merci pour votre demande, ${firstName}!</h1>
        <p>Nous avons bien reçu votre demande de devis pour le service "${service}".</p>
        <p>Notre équipe va l'examiner et vous contacter rapidement.</p>
        <p>Cordialement,<br>L'équipe Hello Wash</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);