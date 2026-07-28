import Hero from "../../components/Hero/Hero";
import Stats from "../../components/Stats/Stats";
import FeaturedJobs from "../../components/FeaturedJobs/FeaturedJobs";
import Categories from "../../components/Categories/Categories";
import TopCompanies from "../../components/TopCompanies/TopCompanies";
import AISection from "../../components/AISection/AISection";
import Testimonials from "../../components/Testimonials/Testimonials";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedJobs />
      <TopCompanies />
      <AISection />
      <Stats />
      <Testimonials />
    </>
  );
}

export default Home;
