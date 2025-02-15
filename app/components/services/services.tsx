"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Service {
  id: number;
  iconsrc: string;
  icontype: "image" | "video";
  iconalt: string;
  title: string;
  description: string;
  isEditing?: boolean;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const supabase = createClientComponentClient();

  const simulateLoading = async () => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setLoadingPercentage((prev) => Math.min(prev + 10, 100));
      }, 200);
      setTimeout(() => {
        clearInterval(interval);
        resolve(true);
      }, 1000);
    });
  };

  const fetchServices = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("services").select("*");
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services.");
      setServices([]);
    }
  }, [supabase]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await simulateLoading();
        const isAdminStatus = await checkAdminStatus();
        setIsAdmin(isAdminStatus);
        await fetchServices();
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchServices]);

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
    } catch {
      // console.error("Error checking admin status:", error);
      // toast.error("Failed to check admin status.");
      return false;
    }
  };

  const handleSaveService = async (index: number) => {
    const serviceToSave = services[index];

    if (
      !serviceToSave.title ||
      !serviceToSave.description ||
      !serviceToSave.iconsrc
    ) {
      toast.error(
        "Title, description, and image source (iconSrc) are required."
      );
      return;
    }

    try {
      const { error } = await supabase
        .from("services")
        .update({
          title: serviceToSave.title,
          description: serviceToSave.description,
          iconsrc: serviceToSave.iconsrc,
          icontype: serviceToSave.icontype,
          iconalt: serviceToSave.iconalt,
        })
        .eq("id", serviceToSave.id);

      if (error) throw error;

      const updatedServices = [...services];
      updatedServices[index] = { ...serviceToSave, isEditing: false };
      setServices(updatedServices);

      toast.success("Service updated successfully!");
    } catch (error) {
      console.error("Error saving service:", error);

      toast.error(`Error adding service: ${JSON.stringify(error)}`);
    }
  };

  const handleAddService = async () => {
    if (services.length >= 8) {
      toast.error("You can only add up to 8 services.");
      return;
    }

    const newService = {
      title: "New Service",
      description: "Description here",
      iconsrc: "/placeholder.svg",
      icontype: "image" as const,
      iconalt: "New Service",
    };

    try {
      const { data, error } = await supabase
        .from("services")
        .insert([newService])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setServices([...services, { ...data[0], isEditing: true }]);
        toast.success("New service added successfully!");
      } else {
        throw new Error("No data returned from insert operation");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error(`Error adding service: ${JSON.stringify(error)}`);
    }
  };

  const handleDeleteService = async (index: number) => {
    const serviceToDelete = services[index];

    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceToDelete.id);
      if (error) throw error;

      const updatedServices = services.filter((_, i) => i !== index);
      setServices(updatedServices);
      toast.success("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);

      toast.error(`Error adding service: ${JSON.stringify(error)}`);
    }
  };

  const handleEditToggle = (index: number) => {
    const updatedServices = services.map((service, i) => ({
      ...service,
      isEditing: i === index ? !service.isEditing : false,
    }));
    setServices(updatedServices);
  };

  const handleInputChange = (
    index: number,
    field: keyof Omit<Service, "id" | "iconsrc" | "icontype" | "iconalt">,
    value: string
  ) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    };
    setServices(updatedServices);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedServices = [...services];
        updatedServices[index] = {
          ...updatedServices[index],
          iconsrc: reader.result as string,
          icontype: file.type.startsWith("image/") ? "image" : "video",
          iconalt: file.name,
        };
        setServices(updatedServices);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#f8f1e7] text-black text-center px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 min-h-screen">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-xl sm:text-xl md:text-3xl font-semibold text-[#3f3a6e]">
          Our Salon Services
        </h1>
        <p className="text-lg sm:text-xl mt-3 sm:mt-4 text-[#6f6f6f]">
          Discover our premium services designed to pamper you in best possible
          way.
        </p>
      </header>

      {loading ? (
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
          <div className="mb-12 sm:mb-16">
            {isAdmin && (
              <button
                className="bg-[#000] text-white py-2 px-6 rounded-lg"
                onClick={handleAddService}
              >
                Add New Service
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white shadow-lg rounded-xl p-6 text-left"
              >
                {service.isEditing && isAdmin ? (
                  <div>
                    <input
                      type="text"
                      className="w-full mb-4 p-3 border-2 border-gray-300 rounded-lg"
                      value={service.title}
                      onChange={(e) =>
                        handleInputChange(index, "title", e.target.value)
                      }
                      placeholder="Service Title"
                    />
                    <textarea
                      className="w-full mb-4 p-3 border-2 border-gray-300 rounded-lg"
                      value={service.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                      placeholder="Service Description"
                    ></textarea>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="w-full mb-4"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                    <div className="flex justify-end">
                      <button
                        className="bg-[#f32170] text-white py-2 px-6 rounded-lg"
                        onClick={() => handleSaveService(index)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-5xl mb-4">
                      {service.icontype === "image" && service.iconsrc ? (
                        <Image
                          src={service.iconsrc || "/placeholder.svg"}
                          alt={service.iconalt}
                          width={300}
                          height={200}
                          className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                      ) : service.icontype === "video" && service.iconsrc ? (
                        <video
                          src={service.iconsrc}
                          controls
                          className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-gray-500">No media available</div>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-[#3f3a6e]">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                    {isAdmin && (
                      <div className="flex justify-end mt-4">
                        <button
                          className="text-[#f32170]"
                          onClick={() => handleEditToggle(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-4 text-red-500"
                          onClick={() => handleDeleteService(index)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ServicesPage;
