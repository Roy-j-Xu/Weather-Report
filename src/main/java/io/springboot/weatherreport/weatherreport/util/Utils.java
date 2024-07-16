package io.springboot.weatherreport.weatherreport.util;

public class Utils {
    public static String normalizeSearchInput(String input) {
        if (input == null) return "";
        return input.strip();
    }

    public static boolean isEmptyOrNull(String input) {
        return input == null || input.isEmpty();
    }
}
