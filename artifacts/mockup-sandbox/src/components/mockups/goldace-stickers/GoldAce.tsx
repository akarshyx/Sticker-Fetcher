import { useEffect, useRef, useState } from "react";
import lottie, { type AnimationItem } from "lottie-web";

const stickers = [
  { file: "01.json", label: "Sticker 01" },
  { file: "02.json", label: "Sticker 02" },
  { file: "03.json", label: "Sticker 03" },
];

function AnimatedSticker({ file, label }: { file: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let animation: AnimationItem | null = null;
    let disposed = false;

    fetch(`/__mockup/images/goldace/${file}?v=2`)
      .then((response) => {
        if (!response.ok) throw new Error("Sticker preview unavailable");
        return response.json();
      })
      .then((animationData) => {
        if (disposed || !containerRef.current) return;
        animation = lottie.loadAnimation({
          animationData,
          autoplay: true,
          container: containerRef.current,
          loop: true,
          renderer: "svg",
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
          },
        });
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });

    return () => {
      disposed = true;
      animation?.destroy();
    };
  }, [file]);

  return (
    <div
      style={{
        alignItems: "center",
        aspectRatio: "1",
        background:
          "radial-gradient(circle at 50% 40%, rgba(255,255,255,.96), rgba(244,229,190,.72) 60%, rgba(218,173,73,.3))",
        border: "1px solid rgba(137, 92, 20, .18)",
        borderRadius: 28,
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        aria-label={label}
        ref={containerRef}
        style={{
          height: "88%",
          opacity: failed ? 0 : 1,
          width: "88%",
        }}
      />
      {failed ? (
        <div
          style={{
            color: "#8e691d",
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            position: "absolute",
          }}
        >
          Preview unavailable
        </div>
      ) : null}
      <span
        style={{
          background: "rgba(255, 250, 239, .86)",
          border: "1px solid rgba(137, 92, 20, .14)",
          borderRadius: 999,
          bottom: 12,
          color: "#8e691d",
          fontFamily: "Inter, sans-serif",
          fontSize: 10,
          fontWeight: 700,
          left: 12,
          letterSpacing: ".14em",
          padding: "6px 9px",
          position: "absolute",
          textTransform: "uppercase",
        }}
      >
        Gold finish
      </span>
    </div>
  );
}

export function GoldAce() {
  return (
    <main
      style={{
        background:
          "linear-gradient(135deg, #24180a 0%, #4b2e0e 42%, #1c140b 100%)",
        boxSizing: "border-box",
        color: "#fffaf0",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        minHeight: "100vh",
        padding: "clamp(28px, 6vw, 72px)",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: 1180 }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 12,
            justifyContent: "space-between",
            marginBottom: 52,
          }}
        >
          <div
            style={{
              color: "#f1c75b",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: ".22em",
              textTransform: "uppercase",
            }}
          >
            Sticker pack preview
          </div>
          <div
            style={{
              border: "1px solid rgba(241, 199, 91, .45)",
              borderRadius: 999,
              color: "#f1c75b",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".12em",
              padding: "8px 12px",
              textTransform: "uppercase",
            }}
          >
            Preview only
          </div>
        </div>

        <section
          style={{
            alignItems: "end",
            display: "grid",
            gap: 28,
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(260px, .95fr)",
            marginBottom: 54,
          }}
        >
          <div>
            <p
              style={{
                color: "#f1c75b",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: ".12em",
                margin: "0 0 16px",
                textTransform: "uppercase",
              }}
            >
              Raika67 refreshed
            </p>
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(48px, 8vw, 94px)",
                fontWeight: 400,
                letterSpacing: "-.06em",
                lineHeight: ".9",
                margin: 0,
              }}
            >
              GoldAce
            </h1>
            <p
              style={{
                color: "rgba(255, 250, 240, .72)",
                fontSize: 17,
                lineHeight: 1.6,
                margin: "28px 0 0",
                maxWidth: 540,
              }}
            >
              A first look at the sticker pack with the red tones shifted to
              warm gold while the white details stay crisp and unchanged.
            </p>
          </div>
          <div
            style={{
              borderLeft: "1px solid rgba(241, 199, 91, .28)",
              color: "rgba(255, 250, 240, .68)",
              fontSize: 13,
              lineHeight: 1.7,
              paddingLeft: 24,
            }}
          >
            <div style={{ color: "#fffaf0", fontWeight: 700 }}>
              Original pack
            </div>
            <div style={{ marginBottom: 18 }}>@raika | 67</div>
            <div style={{ color: "#fffaf0", fontWeight: 700 }}>
              Transformation
            </div>
            <div>Red tones to gold</div>
            <div>White details preserved</div>
          </div>
        </section>

        <section
          aria-label="GoldAce sticker previews"
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          {stickers.map((sticker) => (
            <AnimatedSticker
              file={sticker.file}
              key={sticker.file}
              label={sticker.label}
            />
          ))}
        </section>

        <footer
          style={{
            borderTop: "1px solid rgba(241, 199, 91, .2)",
            color: "rgba(255, 250, 240, .55)",
            fontSize: 12,
            marginTop: 34,
            paddingTop: 18,
          }}
        >
          GoldAce is the proposed display name. Nothing has been uploaded back
          to Telegram yet.
        </footer>
      </div>
    </main>
  );
}