import computers from "@/app/(tools)/tech/computers";
import {
  desktopAccessories,
  wearables,
  devices,
  headphones,
} from "@/app/(tools)/tech/devices";
import {
  devSoftware,
  cliSoftware,
  genSoftware,
} from "@/app/(tools)/tech/software";
import ItemList from "@/components/item-list";
import Section from "@/components/section";
import Computer from "@/components/tech/computer";
import Device from "@/components/tech/devices";
import { Software } from "@/components/tech/software";

export default function TechPage() {
  return (
    <div className="mx-auto flex w-11/12 flex-col justify-center space-y-4 lg:w-8/12">
      <Section title="Computers">
        <ItemList
          items={computers}
          renderItem={computer => <Computer computer={computer} />}
          className="flex flex-col space-y-2"
        />
      </Section>

      <div className="space-y-2">
        <p className="text-xl">Gadgets</p>

        <Section title="Desktop Accessories">
          <ItemList
            items={desktopAccessories}
            renderItem={device => <Device device={device} />}
            className="flex flex-col md:flex-row md:space-x-8"
          />
        </Section>

        <Section title="Devices">
          <ItemList
            items={devices}
            renderItem={device => <Device device={device} />}
            className="flex flex-col md:flex-row md:space-x-8"
          />
        </Section>

        <Section title="Wearables">
          <ItemList
            items={wearables}
            renderItem={device => <Device device={device} />}
            className="flex flex-col md:flex-row md:space-x-8"
          />
        </Section>

        <Section title="Headphones">
          <ItemList
            items={headphones}
            renderItem={device => <Device device={device} />}
            className="flex flex-col md:flex-row md:space-x-8"
          />
        </Section>
      </div>

      <Section title="Development">
        <ItemList
          items={devSoftware}
          renderItem={software => <Software software={software} />}
          className="flex flex-col md:flex-row md:space-x-8"
        />
      </Section>

      <Section title="CLI">
        <ItemList
          items={cliSoftware}
          renderItem={software => <Software software={software} />}
          className="flex flex-col md:flex-row md:space-x-8"
        />
      </Section>

      <Section title="General">
        <ItemList
          items={genSoftware}
          renderItem={software => <Software software={software} />}
          className="flex flex-col md:flex-row md:space-x-8"
        />
      </Section>
    </div>
  );
}
