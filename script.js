let abortController = new AbortController();
let requestInFlight = undefined;

function main() {
    const input = document.getElementsByName("echo_input")[0];
    const output = document.getElementById("output");

    input.addEventListener("input", () => {
        const inptVal = input.value;

        console.log(inptVal);

    });
    input.addEventListener("change", () => {
        if (requestInFlight) {
            console.log("Aborting")
            abortController.abort();
        }
    })


    input.addEventListener("change", async () => {
        const value = input.value;
        abortController = new AbortController();
        let signal = abortController.signal;

        try {
            requestInFlight = fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ input: value }),
                signal: signal
            });

            const response = await requestInFlight;

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            output.textContent = `Server Response: ${JSON.stringify(data)}`;

        } catch (error) {
            console.error("Fetched error:", error);
        } finally {
            requestInFlight = undefined;
        }
    });

}



document.addEventListener("DOMContentLoaded", main);