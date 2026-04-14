package ma.aui.cs;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.net.URI;
import java.net.http.*;
import java.util.Map;
import jakarta.json.*;
import java.io.StringReader;

@Path("/translate")
public class TranslateResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, String> translate(Map<String, String> req) {

        String text = req.get("text");
        if (text == null || text.trim().isEmpty()) {
            return Map.of("error", "No text provided");
        }

        String apiKey = System.getenv("OPENAI_API_KEY");
        String url = "https://api.openai.com/v1/chat/completions";

        String prompt = "You are an expert in Moroccan Darija. Translate the following English text into natural Moroccan Darija written in Arabic script, exactly as a Moroccan would say it in real life. Return only the translation, nothing else:\n" + text;

        JsonObject message = Json.createObjectBuilder()
                .add("role", "user")
                .add("content", prompt)
                .build();

        JsonObject body = Json.createObjectBuilder()
                .add("model", "gpt-4o-mini")
                .add("messages", Json.createArrayBuilder().add(message))
                .build();

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JsonObject json = Json.createReader(new StringReader(response.body())).readObject();
            String translation = json
                    .getJsonArray("choices")
                    .getJsonObject(0)
                    .getJsonObject("message")
                    .getString("content");

            return Map.of("translation", translation);

        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }
}