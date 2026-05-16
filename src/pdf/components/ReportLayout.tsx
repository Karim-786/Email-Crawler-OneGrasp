import {
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

import { styles } from "../styles";

type ReportLayoutProps = {
  children: React.ReactNode;
  pageNumber: number;
};

export default function ReportLayout({
  children,
  pageNumber,
}: ReportLayoutProps) {

  return (

    <Page size="A4" style={styles.page}>

      {/* TOP RED BAR */}
      <View
        style={{
          height: 18,
          backgroundColor: "#dc2626",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      />

      {/* HEADER */}
      <View
        style={{
          marginTop: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
          paddingBottom: 10,
        }}
      >

        <Text
          style={{
            fontSize: 12,
            color: "#dc2626",
            fontWeight: "bold",
          }}
        >
          CAREER REPORT
        </Text>

        <Text
          style={{
            fontSize: 20,
            color: "#dc2626",
            fontWeight: "bold",
          }}
        >
          OneGrasp
        </Text>

      </View>

      {/* MAIN CONTENT */}
      <View
        style={{
          marginTop: 20,
          flex: 1,
        }}
      >
        {children}
      </View>

      {/* FOOTER */}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 40,
          right: 40,
          borderTopWidth: 1,
          borderTopColor: "#d1d5db",
          paddingTop: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >

        <Text
          style={{
            fontSize: 9,
            color: "#6b7280",
          }}
        >
          ☎ 8977760443 ✉ support@onegrasp.com
        </Text>

        <Text
          style={{
            fontSize: 9,
            color: "#6b7280",
          }}
        >
          Page {pageNumber} of 38
        </Text>

      </View>

    </Page>

  );
}