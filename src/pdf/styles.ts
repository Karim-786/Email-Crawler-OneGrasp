import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({

  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontSize: 12,
    color: "#1f2937",
    fontFamily: "Helvetica",
  },

  header: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 20,
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#dc2626",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 11,
    letterSpacing: 3,
    color: "#6b7280",
  },

  title: {
    marginTop: 30,
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },

  description: {
    marginTop: 10,
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.6,
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111827",
  },

  scoreGrid: {
    flexDirection: "row",
    gap: 15,
  },

  scoreCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 20,
  },

  scoreTitle: {
    fontSize: 14,
    color: "#4b5563",
  },

  scoreValue: {
    marginTop: 10,
    fontSize: 36,
    fontWeight: "bold",
    color: "#dc2626",
  },

  paragraph: {
    lineHeight: 1.8,
    fontSize: 12,
    color: "#374151",
  },

  recommendationCard: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 15,
  },

  recommendationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc2626",
  },

  recommendationText: {
    marginTop: 8,
    lineHeight: 1.7,
    color: "#4b5563",
  },

});