import { render, fireEvent, screen} from "@testing-library/vue"
import { describe, expect, test } from "vitest";

import Step3 from "../index.vue"

describe("Step3", () => {
    test("renders the component correctly", () => {
        const wrapper = render(Step3);

        expect(wrapper).toBeDefined()
    });

    test("displays de correct texts", () => {
        render(Step3);

        expect(screen.findByText('Payment type')).toBeDefined()
        expect(screen.findByText('Notes')).toBeDefined()
    });
})