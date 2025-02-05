import React from "react";
import { NextPage } from "next";
import { BodyLong } from "@navikt/ds-react";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { Page } from "@/components/page/Page";
import { SykemeldtHeader } from "@/components/designsprint/SykemeldtHeader";
import { Tidslinje } from "@/components/designsprint/Tidslinje";

const Home: NextPage = () => {
  return (
    <Page>
      <AktivitetskravBox>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-4">
            <SykemeldtHeader />

            <Tidslinje />
          </div>
        </div>
      </AktivitetskravBox>
    </Page>
  );
};

export default Home;
