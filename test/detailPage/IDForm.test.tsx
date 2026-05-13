import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormConfiguration from "components/detailPage/FormConfiguration";

import { JSONSchema7TypeName } from "json-schema";

describe("<FormConfiguration/>", () => {
    const mockProps = {
        id: 1,
        name: "Test Form",
        clientId: 1234,
    };

    const { clientId, id, name } = mockProps;

    const jsonSchema = {
        type: "object" as JSONSchema7TypeName,
        properties: {
            logoUrl: {
                type: ["string" as JSONSchema7TypeName, "null" as JSONSchema7TypeName],
                title: "Logo-Link-URL (falls abweichend von Startseite)",
                format: "uri-reference",
            },
            actionLinks: {
                type: "array" as JSONSchema7TypeName,
                items: {
                    $ref: "#/definitions/linkElement",
                },
                title: "Actions",
            },
        },
        definitions: {
            linkElement: {
                type: "object" as JSONSchema7TypeName,
                allOf: [
                    {
                        properties: {
                            elementType: {
                                const: "TEXT_LINK",
                            },
                        },
                    },
                ],
            },
        },
        additionalProperties: false,
    };

    const settings = {
        logoUrl: null,
        actionLinks: [
            {
                url: null,
                order: 0,
                elementType: "TEXT_LINK",
            },
            {
                url: "http://www.ippen.media",
                order: 1,
                elementType: "TEXT_LINK",
            },
        ],
    };

    test("renders correctly", () => {
        render(<FormConfiguration
            id={id}
            name={name}
            clientId={clientId}
            jsonSchema={jsonSchema}
            settings={settings}
            editMode={false}
            formData={settings}
            submitForm={() => { /* empty */ }}
            handleFormChange={() => { /* empty */ }}
            showResetDialog={() => { /* empty */ }}
        />);
        const arrayTemp = screen.queryByTestId("templateArray");
        expect(arrayTemp).toBeInTheDocument();
    });
});
