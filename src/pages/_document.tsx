import {
  DecoratorComponents,
  fetchDecoratorReact,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { AktivitetspliktCrumbs } from "@/breadcrumbs/breadcrumbs";

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (
  initialProps: DocumentInitialProps,
  name: string,
): string => {
  return initialProps.head?.find((element) => element?.props?.name === name)
    ?.props?.content;
};

interface Props {
  Decorator: DecoratorComponents;
  language: string;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const Decorator = await fetchDecoratorReact({
      env:
        process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "prod" ? "prod" : "dev",
      params: {
        context: "privatperson",
        chatbot: true,
        feedback: false,
        redirectToApp: true,
        level: "Level4",
        urlLookupTable: false,
        logoutWarning: true,
        breadcrumbs: AktivitetspliktCrumbs,
      },
    });

    const language = getDocumentParameter(initialProps, "lang");

    return { ...initialProps, Decorator, language };
  }

  render() {
    const { Decorator } = this.props;

    return (
      <Html lang="nb">
        <Head>
          <Decorator.Styles />
          <link
            rel="preload"
            href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>

        <body>
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <Decorator.Scripts />
          <NextScript />
        </body>
      </Html>
    );
  }
}
