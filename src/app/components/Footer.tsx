import React from "react";

export function Footer() {
  return (
    <footer className="mt-auto w-full py-4 bg-gray-900 text-gray-400 text-center">
      <p>
        Simplify your dev environment with{" "}
        <span className="text-white font-bold">
          <a
            href="https://daytona.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daytona
          </a>
        </span>
      </p>
    </footer>
  );
}