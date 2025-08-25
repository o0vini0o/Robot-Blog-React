import extractYouTubeId from "../utils/extractYouTubeId";

const YoutubeEmbed = ({ url }) => {
  const videoId = extractYouTubeId(url);
  if (!videoId) return;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden p-2">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default YoutubeEmbed;
