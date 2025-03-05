import { useEffect, useState } from "react";
import {
  EntityProvider,
  ReplykeProvider,
  useSignTestingJwt,
} from "@replyke/react-js";
import { Toaster } from "@/components/ui/sonner";
import { posts, users } from "./constants/dummy-data";
import { Button } from "./components/ui/button";
import DiscussionSheet from "./components/DiscussionSheet";

const PROJECT_ID = import.meta.env.VITE_PUBLIC_REPLYKE_PROJECT_ID;
const PRIVATE_KEY = import.meta.env.VITE_PUBLIC_REPLYKE_SECRET_KEY;

function App() {
  const signTestingJwt = useSignTestingJwt();

  const [selectedPostId, setSelectdPostId] = useState<string | null>(null);
  const [signedToken, setSignedToken] = useState<string>();

  useEffect(() => {
    const handleSignJwt = async () => {
      const payload = users[0];

      const token = await signTestingJwt({
        projectId: PROJECT_ID,
        payload,
        privateKey: PRIVATE_KEY,
      });
      // Set the signed JWT in the state
      setSignedToken(token);
    };

    handleSignJwt();
  }, []);

  return (
    <ReplykeProvider projectId={PROJECT_ID} signedToken={signedToken}>
      <Toaster />
      <EntityProvider referenceId={selectedPostId} createIfNotFound>
        <DiscussionSheet
          isSheetOpen={!!selectedPostId}
          onClose={() => setSelectdPostId(null)}
        />
      </EntityProvider>
      <div className="h-screen grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 sm:p-8 md:p-12 lg:p-24 xl:p-52 gap-4 md:gap-8 lg:gap-12 m-auto">
        {posts.map((post) => (
          <div className="bg-white p-4 mb-4 rounded-xl shadow-lg" key={post.id}>
            {/* Post Content */}
            <p className="text-lg font-bold text-gray-800">{post.id}</p>
            <p className="text-gray-600 mt-2">{post.content}</p>

            {/* Open Discussion Button */}
            <Button
              onClick={() => setSelectdPostId(post.id)}
              className="w-full mt-4 cursor-pointer"
            >
              Open Discussion
            </Button>
          </div>
        ))}
      </div>
    </ReplykeProvider>
  );
}

export default App;
