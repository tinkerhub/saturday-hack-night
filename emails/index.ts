
import { transporter } from "@/utils/mailTransporter";
import * as templates from "./templates";
import { env } from "@/utils/config";

async function renderEmail<K extends keyof typeof templates>(
  template: K,
  props: React.ComponentProps<(typeof templates)[K]>
) {
  const Component = templates[template];
  const ReactDOMServer = (await import("react-dom/server")).default;
  return (
    ReactDOMServer.renderToStaticMarkup(Component(props)));
}

async function sendEmail<K extends keyof typeof templates,>(
  template: K,
  props: React.ComponentProps<(typeof templates)[K]>,
  subject: string,
  to: string
) {
    try {
        const html = await renderEmail(template, props);
        transporter.sendMail({
            from: env.SMTP_FROM,
            to,
            subject: subject,
            html,
        });
    
    } catch (error) {
        console.error("Error sending email", error);
    }
}

export { renderEmail, sendEmail };