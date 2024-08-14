/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.multiLineDocs.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Operand {
    GREATER_THAN(">"),

    EQUAL_TO("="),

    LESS_THAN("less_than");

    private final String value;

    Operand(String value) {
        this.value = value;
    }

    @JsonValue
    @java.lang.Override
    public String toString() {
        return this.value;
    }
}
