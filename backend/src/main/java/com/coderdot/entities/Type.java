package com.coderdot.entities;

public enum Type {
    DSI("INFORMATIQUE"),
    MDW("INFORMATIQUE"),
    RSI("INFORMATIQUE"),
    SEM("INFORMATIQUE"),
    SEA("MECANIQUE"),
    EIPO("MECANIQUE"),
    MCTR("MECANIQUE"),
    ALII("ELECTRIQUE"),
    ECLT("ELECTRIQUE"),
    ASI("ELECTRIQUE"),
    BAT("GENIE_CIVILE"),
    ARCH("GENIE_CIVILE"),
    BLD("GENIE_CIVILE");

    private final String specialite;

    Type(String specialite) {
        this.specialite = specialite;
    }

    public String getSpecialite() {
        return specialite;
    }
}