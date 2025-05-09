import { emails } from "@/app/(main)/about/emails";
import { faq } from "@/app/(main)/about/faq";
import Answer from "@/components/about/answer";
import Email from "@/components/about/email";
import Question from "@/components/about/question";
import ItemList from "@/components/item-list";
import Section from "@/components/section";

export default function AboutPage() {
  return (
    <div className="mx-auto mb-8 w-11/12 space-y-4 md:w-8/12 lg:w-7/12">
      <Section title="Contact">
        <p>Interested in working with me?</p>
        <ItemList
          items={emails}
          renderItem={email => (
            <Email name={email.name} link={email.link} icon={email.icon} />
          )}
          className="inline-flex space-x-4"
        />
      </Section>

      <Section title="FAQ">
        <ItemList
          items={faq}
          renderItem={item => (
            <div>
              <Question question={item.question} />
              <Answer answer={item.answer} />
            </div>
          )}
          className="space-y-2"
        />
      </Section>
    </div>
  );
}
