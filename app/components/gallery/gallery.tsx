"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  type: string;
}

const GalleryComponent = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newMedia, setNewMedia] = useState<File | null>(null);
  const [newMediaPreview, setNewMediaPreview] = useState<string | null>(null);
  const [newAlt, setNewAlt] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const supabase = createClientComponentClient();

  // const simulateLoading = async () => {
  //   return new Promise((resolve) => {
  //     const interval = setInterval(() => {
  //       setLoadingPercentage((prev) => Math.min(prev + 10, 100));
  //     }, 200);
  //     setTimeout(() => {
  //       clearInterval(interval);
  //       resolve(true);
  //     }, 1000);
  //   });
  // };

  const fetchGallery = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("gallery").select("*");
      if (error) throw error;
      setGallery(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load gallery");
      setGallery([]);
    }
  }, [supabase]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await simulateLoading();
        const isAdminStatus = await checkAdminStatus();
        setIsAdmin(isAdminStatus);
        await fetchGallery();
      } catch (error) {
        console.error("Error fetching gallery:", error);
        toast.error("Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchGallery]);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch("/api/admin", { method: "GET" });
      const data = await response.json();
      console.log("Admin status:", data);

      if (response.ok) {
        setIsAdmin(data.isAdmin); // Update state directly
        return data.isAdmin;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast.error("Failed to check admin status.");
      return false;
    }
  };

  // const handleSaveGallery = async (index: number) => {
  //   const serviceToSave = gallery[index];
  //   if (!serviceToSave.alt || !serviceToSave.src || !serviceToSave.type) {
  //     toast.error("Src, Alt and Type are required");
  //     return;
  //   }
  //   try {
  //     const { error } = await supabase
  //       .from("gallery")
  //       .update({
  //         alt: serviceToSave.alt,
  //         src: serviceToSave.src,
  //         type: serviceToSave.type,
  //       })
  //       .eq("id", serviceToSave.id);
  //     if (error) throw error;
  //     const updatedGallery = [...gallery];
  //     updatedGallery[index] = { ...serviceToSave };
  //     setGallery(updatedGallery);
  //   } catch (error) {
  //     console.error("Error updating gallery item:", error);
  //     toast.error("Failed to update gallery item");
  //   }
  // };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewMedia(file);

      const reader = new FileReader();
      reader.onload = () => setNewMediaPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setNewMedia(null);
      setNewMediaPreview(null);
    }
  };

  const handleAddMedia = async () => {
    if (gallery.length >= 10) {
      toast.error("You can only add 10 images to the gallery");
      return;
    }

    const newGallery = {
      src: newMediaPreview,
      alt: newAlt,
      type: newMedia?.type?.startsWith("image/") ? "image" : "video",
    };

    try {
      const { data, error } = await supabase
        .from("gallery")
        .insert([newGallery])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setGallery([...gallery, data[0]]);
        toast.success("Media added successfully!");
      } else {
        toast.error("Failed to add media");
      }
    } catch (error) {
      console.error("Error adding media:", error);
      toast.error("Failed to add media");
    }
  };

  const handleDeleteMedia = async (id: number) => {
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id);

      if (error) throw error;

      setGallery((prev) => prev.filter((media) => media.id !== id));
      toast.success("Media deleted successfully!");
    } catch (error) {
      console.error("Failed to delete media:", error);

      toast.error(`Error adding service: ${JSON.stringify(error)}`);
    }
  };

  return (
    <div className="bg-[#f8f1e7] p-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-[#3f3a6e] mb-8">
          Our Salon Gallery
        </h2>

        {loadingPercentage ? (
          <div className="flex flex-col justify-center items-center min-h-[50vh]">
            <div className="relative w-32 sm:w-40 h-32 sm:h-40">
              <svg className="animate-spin h-full w-full" viewBox="0 0 50 50">
                <circle
                  className="fill-none stroke-[#f32170]"
                  cx="25"
                  cy="25"
                  r="20"
                  strokeWidth="5"
                ></circle>
              </svg>
            </div>
            <p className="text-lg mt-4 text-[#6f6f6f]">
              Loading {loadingPercentage}%...
            </p>
          </div>
        ) : (
          <>
            {isAdmin && (
              <div className="mb-4 flex justify-end">
                <button
                  onClick={handleEditToggle}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((media) => (
                <div
                  key={media.id}
                  className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 relative"
                >
                  {media.type === "image" ? (
                    <Image
                      src={media.src || "/placeholder.svg"}
                      width={400}
                      height={400}
                      alt={media.alt}
                      className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <video
                      src={media.src}
                      controls
                      className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {isEditing && isAdmin && (
                    <button
                      onClick={() => handleDeleteMedia(media.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && isAdmin && (
              <div className="mt-6 bg-gray-100 p-4 rounded">
                <h3 className="text-lg text-black font-bold mb-4">
                  Add New Media
                </h3>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="mb-4"
                />
                {newMediaPreview &&
                  (newMedia?.type.startsWith("image/") ? (
                    <Image
                      src={newMediaPreview}
                      width={200}
                      height={200}
                      alt="Preview"
                    />
                  ) : (
                    <video
                      src={newMediaPreview}
                      controls
                      width={200}
                      height={200}
                    />
                  ))}
                <input
                  type="text"
                  placeholder="Alt Text / Description"
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  className="w-full px-3 py-2 text-black border rounded mt-2"
                />
                <button
                  onClick={handleAddMedia}
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  {loading ? "Uploading..." : "Add Media"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default GalleryComponent;
