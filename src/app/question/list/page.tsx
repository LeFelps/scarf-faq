import PageContent from "@/components/layout/content";
import PageTitle from "@/components/layout/page-title";
import Navbar from "@/components/navbar";
import QuestionListing from "@/components/question/listing";

export default function QuestionList() {
  return (
    <>
      <Navbar />
      <PageContent>
        <PageTitle title="Lista de perguntas" returnButton/>
        <QuestionListing />
      </PageContent>
    </>
  )
}
