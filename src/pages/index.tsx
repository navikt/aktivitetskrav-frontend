import React from "react";
import { NextPage } from "next";
import { BodyLong } from "@navikt/ds-react";
import { AktivitetskravBox } from "@/components/box/AktivitetskravBox";
import { Page } from "@/components/page/Page";
import { SykemeldtHeader } from "@/components/designsprint/SykemeldtHeader";
import { Tidslinje } from "@/components/designsprint/Tidslinje";
import { PageContainer, RootPages, SideMenu } from "@navikt/dinesykmeldte-sidemeny";
import { PersonIcon } from "@navikt/aksel-icons";

const Home: NextPage = () => {
  return (
    <PageContainer
      sykmeldt={{ navn: "Per Persen", fnr: "12345678910" }}
      header={{
        title: "Per Persen",
        subtitle: `100% sykmeldt 23. januar 2025 - 23. februar 2025`,
        Icon: PersonIcon,
      }}
      navigation={
        <SideMenu
          sykmeldtName={"Per Persen"}
          sykmeldtId={"12345678910"}
          activePage={RootPages.DineSykmeldte}
          routes={{
            Soknader: 0,
            Sykmeldinger: 0,
            Meldinger: false,
            Dialogmoter: 0,
            Oppfolgingsplaner: 0,
            DineSykmeldte: 0,
          }}
        />
      }
    >
        <AktivitetskravBox>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-4">
              <Tidslinje />
            </div>
          </div>
        </AktivitetskravBox>
    </PageContainer>
  );
};

export default Home;
