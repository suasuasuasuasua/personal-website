import { emails } from "@/app/about/emails";
import { faq } from "@/app/about/faq";
import Answer from "@/components/about/answer";
import Email from "@/components/about/email";
import Question from "@/components/about/question";

export default function AboutPage() {
  return (
    <div className="mx-auto mb-8 w-11/12 space-y-4 md:w-8/12 lg:w-7/12">
      {/* Contact */}
      <div>
        <div className="mb-2 text-2xl font-bold underline underline-offset-4">
          Contact
        </div>
        <p>Interested in working with me?</p>
        <ul className="inline-flex space-x-4">
          {Object.entries(emails).map(([key, value]) => (
            <li key={key}>
              <Email name={value.name} link={value.link} icon={value.icon} />
            </li>
          ))}
        </ul>
      </div>
      {/* FAQ */}
      <div>
        <div className="mb-2 text-2xl font-bold underline underline-offset-4">
          FAQ
        </div>
        <ul className="space-y-2">
          {Object.entries(faq).map(([key, value]) => (
            <li key={key}>
              <div>
                <Question question={value.question} />
                <Answer answer={value.answer} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
