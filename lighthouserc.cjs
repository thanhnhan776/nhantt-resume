module.exports = {
  ci: {
    collect: {
      url: ["http://127.0.0.1:4173/"],
      startServerCommand:
        "python3 -m http.server 4173 --bind 127.0.0.1 --directory out",
      startServerReadyPattern: "Serving HTTP on",
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci",
    },
  },
}
