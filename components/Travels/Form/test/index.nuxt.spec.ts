import { render, fireEvent, screen} from "@testing-library/vue"
import { describe, expect, test } from "vitest";

import Form from "../index.vue"
import { travels } from "~/server/stubs/travels";

describe("form", () => {
    test("renders the component correctly", () => {
        const wrapper = render(Form, {
            props: { isEditing: false },
        });

        expect(wrapper).toBeDefined()
    });

    test("displays de correct texts", () => {
        render(Form, {props: { isEditing: false }});

        expect(screen.findByText('Create travel')).toBeDefined()
        expect(screen.findByText('Travel name')).toBeDefined()
        expect(screen.findByText('Travel type')).toBeDefined()
        expect(screen.findByText('Price')).toBeDefined()
        expect(screen.findByText('Image URL')).toBeDefined()
        expect(screen.findByText('Departure and arrival dates')).toBeDefined()
        expect(screen.findByText('Description')).toBeDefined()
        expect(screen.findByText('Cancel')).toBeDefined()
        expect(screen.findByText('Submit')).toBeDefined()
    });

    test("when the user is editing the form should be filled with the current travel", () => {
        render(Form, {props: { isEditing: true, travel: travels[0] }});

        expect(screen.findByText('Edit travel')).toBeDefined()
        expect(screen.findByText('Italy Express: Naples and the Amalfi Coast')).toBeDefined()
        expect(screen.findByText('A very cool trip')).toBeDefined()
    });

    test("when the user is editing and changes have been made, the submit button should be enabled", () => {
        render(Form, {props: { isEditing: true, travel: travels[0] }});

        const inputs = screen.getAllByRole('textbox')
        const buttons = screen.getAllByRole('button')

        fireEvent.change(inputs[0], {target: {value: 'New travel title'}})
        fireEvent.click(buttons[3])

        expect(buttons[3].hasAttribute('disabled')).toBeFalsy()
    }); 
});