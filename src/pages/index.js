import * as React from "react";
import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import DefaultLayout from "../components/DefaultLayout";
import Article from "../components/Article";
import StaticIntlProvider from "../components/StaticIntlProvider";
import {
  Container,
  Grid,
  useMediaQuery,
  Fade
} from "@material-ui/core";
import Section from "../components/Section";
import HeaderBackgroundDesktop from "../images/accueil_Desktop.jpg";
import HeaderBackgroundPhone from "../images/accueil_iPhone.jpg";
import HeaderBackgroundTablet from "../images/accueil_iPad.jpg";
import HomepageMission from "../images/accueil_desktop2.jpg";
import "../app.css";

const IndexPage = ({ location }) => {

  const handleChange = (e) => {
    setLocale(e.target.name);
  };

  useEffect(() => {
    if (location.state != null) {
      setLocale(location.state.language)
    }

    const articlesLeft = document.querySelectorAll('.articleLeft');
    const articlesRight = document.querySelectorAll('.articleRight');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {       
        if (entry.isIntersecting) {
          if(entry.target.className.includes("articleRight"))
          {
            entry.target.classList.add('articleAnimationRight');
          }
          else
          {
            entry.target.classList.add('articleAnimationLeft');
          }
          return;
        }
  
        entry.target.classList.remove('articleAnimationRight');
        entry.target.classList.remove('articleAnimationLeft');
      });
    });
    
    articlesLeft.forEach(a => {
      observer.observe(a);
    }) 

    articlesRight.forEach(a => {
      observer.observe(a);
    }) 
  }, []);

  const [locale, setLocale] = useState("en")

  // Gestion de l'image de fond pour le header
  let headerBackground = HeaderBackgroundDesktop;

  const isTablet = useMediaQuery("(max-width: 1366px) and (min-width: 601px)");
  const isPhone = useMediaQuery("(max-width: 600px)");

  if (isTablet) {
    headerBackground = HeaderBackgroundTablet;
  }
  else {
    headerBackground = isPhone ? HeaderBackgroundPhone : HeaderBackgroundDesktop;
  }

  return (
    <>
      <StaticIntlProvider locale={locale} >
        <DefaultLayout title={<FormattedMessage id="homepage.title" values={{ br: <br></br> }} />}
          handleChange={handleChange}
          backgroundImageUrl={headerBackground}>
          <Section style={{overflow: "hidden"}}>
            <Container maxWidth="lg">
              <Grid item xs={12}>
                <Section>
                  <Article text={<FormattedMessage id="homepage.missionDescription" />} imageUrl={HomepageMission} isReversed={true}></Article>
                </Section>
              </Grid>
            </Container>
          </Section>
        </DefaultLayout>
      </StaticIntlProvider>
    </>
  )
}

export default IndexPage
