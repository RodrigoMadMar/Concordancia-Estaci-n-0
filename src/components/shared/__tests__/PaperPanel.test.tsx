import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { PaperPanel } from "@/components/shared/PaperPanel";

describe("PaperPanel", () => {
  it("renders document heading and body content", async () => {
    const { getByText } = await render(
      <PaperPanel meta="Expediente" title="07-14-C">
        <Text>Contenido administrativo</Text>
      </PaperPanel>,
    );

    expect(getByText("07-14-C")).toBeTruthy();
    expect(getByText("Expediente")).toBeTruthy();
    expect(getByText("Contenido administrativo")).toBeTruthy();
  });
});
