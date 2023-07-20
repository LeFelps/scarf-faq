import PageContent from "@/components/layout/content";
import PageTitle from "@/components/layout/page-title";
import Navbar from "@/components/navigation/navbar";
import QuestionForm from "@/components/question/form";

export default function NewQuestion() {
  return (
    <>
      <Navbar />
      <PageContent>
        <PageTitle title="Adicionar pergunta" returnButton />
        <QuestionForm />
      </PageContent>
    </>
  )
}
