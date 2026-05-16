import {
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

export default function AssessmentReport() {

  return (

    <Document>

      <Page
        size="A4"
        style={{
          backgroundColor: "#f3f4f6",
          paddingTop: 22,
          paddingHorizontal: 24,
          paddingBottom: 30,
          fontFamily: "Helvetica",
        }}
      >

        {/* TOP BAR */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 16,
            backgroundColor: "#dc2626",
          }}
        />

        {/* HEADER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >

          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              color: "#ffffff",
              backgroundColor: "#dc2626",
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            CAREER REPORT
          </Text>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#dc2626",
            }}
          >
            OneGrasp
          </Text>

        </View>

        {/* MAIN CARD */}
        <View
          style={{
            backgroundColor: "#ffffff",
            flexDirection: "row",
            minHeight: 720,
          }}
        >

          {/* LEFT SIDE */}
          <View
            style={{
              width: 260,
              backgroundColor: "#404040",
              paddingHorizontal: 28,
              paddingVertical: 26,
            }}
          >

            {/* LOGO */}
            <View
              style={{
                backgroundColor: "#dc2626",
                paddingVertical: 18,
                alignItems: "center",
              }}
            >

              <Text
                style={{
                  fontSize: 28,
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                OneGrasp
              </Text>

            </View>

            {/* NAME */}
            <View style={{ marginTop: 38 }}>

              <Text
                style={{
                  color: "#a3a3a3",
                  fontSize: 9,
                }}
              >
                Report Prepared For
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: "bold",
                  lineHeight: 1.5,
                }}
              >
                BASANI MARY{"\n"}
                RUHIKA REDDY
              </Text>

            </View>

            {/* RED BUTTON */}
            <View
              style={{
                marginTop: 24,
                backgroundColor: "#dc2626",
                paddingVertical: 12,
                alignItems: "center",
              }}
            >

              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: "bold",
                }}
              >
                Career Report for Graduates
              </Text>

            </View>

            {/* DETAILS */}
            <View style={{ marginTop: 34 }}>

              {[
                {
                  title: "PERSONALITY TYPE",
                  value:
                    "ESFJ - Extrovert · Sensing · Feeling · Judging",
                },
                {
                  title: "TOP INTEREST",
                  value: "Social & Investigative",
                },
                {
                  title: "TOP MOTIVATORS",
                  value:
                    "Adventure · Creativity · Social Service",
                },
                {
                  title: "CAREER FOCUS",
                  value:
                    "Financial & Investment Planning",
                },
              ].map((item, index) => (

                <View
                  key={index}
                  style={{
                    marginBottom: 22,
                    borderBottomWidth: 1,
                    borderBottomColor: "#525252",
                    paddingBottom: 10,
                  }}
                >

                  <Text
                    style={{
                      color: "#9ca3af",
                      fontSize: 8,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      marginTop: 6,
                      color: "#ffffff",
                      fontSize: 11,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </Text>

                </View>

              ))}

            </View>

            {/* POWERED */}
            <View
              style={{
                marginTop: 120,
                alignItems: "center",
              }}
            >

              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: 8,
                }}
              >
                Powered By
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  color: "#dc2626",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                OneGrasp
              </Text>

            </View>

          </View>

          {/* RIGHT SIDE */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24,
              paddingVertical: 26,
              backgroundColor: "#fafafa",
            }}
          >

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#374151",
              }}
            >
              Assessment Report
            </Text>

            <View
              style={{
                marginTop: 6,
                width: 160,
                height: 2,
                backgroundColor: "#dc2626",
              }}
            />

            <View style={{ marginTop: 24 }}>

              {[
                ["Report Type", "Graduate Career Report"],
                ["Assessment By", "OneGrasp"],
                [
                  "Methodology",
                  "Psychometric · Interest · EQ · Skills",
                ],
                ["Contact", "8977760443"],
                ["Email", "support@onegrasp.com"],
                ["Year", "2025"],
              ].map((item, index) => (

                <View
                  key={index}
                  style={{
                    marginBottom: 18,
                    borderBottomWidth: 1,
                    borderBottomColor: "#e5e7eb",
                    paddingBottom: 8,
                  }}
                >

                  <Text
                    style={{
                      color: "#9ca3af",
                      fontSize: 8,
                    }}
                  >
                    {item[0]}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 11,
                      color: "#111827",
                    }}
                  >
                    {item[1]}
                  </Text>

                </View>

              ))}

            </View>

            {/* WATERMARK */}
            <Text
              style={{
                position: "absolute",
                bottom: 20,
                right: 24,
                fontSize: 72,
                color: "#e5e7eb",
                fontWeight: "bold",
              }}
            >
              OG
            </Text>

          </View>

        </View>

        {/* FOOTER */}
        <View
          style={{
            marginTop: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <Text
            style={{
              fontSize: 8,
              color: "#6b7280",
            }}
          >
            ☎ 8977760443     ✉ support@onegrasp.com
          </Text>

          <Text
            style={{
              fontSize: 8,
              color: "#374151",
              fontWeight: "bold",
            }}
          >
            Page 1 of 38
          </Text>

        </View>

      </Page>

    </Document>

  );
}