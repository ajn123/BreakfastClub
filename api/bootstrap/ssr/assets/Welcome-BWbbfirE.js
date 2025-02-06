import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Link } from "@inertiajs/react";
function EventSwiper() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (events.length - currentIndex <= 2 && !loading) {
      loadMoreEvents();
    }
  }, [currentIndex, events.length, loading]);
  const loadMoreEvents = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/events?limit=5&page=${page}`);
      setPage(page + 1);
      const newEvents = response.data;
      setEvents((prev) => [...prev, ...newEvents]);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 100;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      const direction = info.offset.x > 0 ? "right" : "left";
      handleSwipe(direction);
    }
  };
  const handleSwipe = (direction) => {
    if (direction === "right") {
      saveLikedEvent(events[currentIndex]);
    }
    setCurrentIndex((prev) => prev + 1);
  };
  const saveLikedEvent = async (event) => {
    try {
      axios.post("/api/liked-events", { eventId: event.id });
    } catch (error) {
      console.error("Error saving liked event:", error);
    }
  };
  if (events.length === 0) return /* @__PURE__ */ jsx("div", { children: "Loading events..." });
  return /* @__PURE__ */ jsxs("div", { className: "relative h-[600px] w-full max-w-md mx-auto", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: events[currentIndex] && /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute w-full h-full",
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
        drag: "x",
        dragConstraints: { left: 0, right: 0 },
        onDragEnd: handleDragEnd,
        whileDrag: { scale: 1.05 },
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl overflow-hidden h-full relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-1/2", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: events[currentIndex].image,
                alt: events[currentIndex].title,
                className: "w-full h-full object-cover brightness-90"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-black/50" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 text-white", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-1 drop-shadow-lg", children: events[currentIndex].title }),
              /* @__PURE__ */ jsx("p", { className: "text-lg opacity-90 drop-shadow-md", children: events[currentIndex].date })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 bg-white", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed", children: events[currentIndex].description }) })
        ] })
      },
      events[currentIndex].id
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 flex justify-between", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleSwipe("left"),
          className: "bg-red-500 text-white p-8 w-1/2 text-2xl hover:bg-red-600 transition-colors",
          children: "✕"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleSwipe("right"),
          className: "bg-green-500 text-white p-8 w-1/2 text-2xl hover:bg-green-600 transition-colors",
          children: "♥"
        }
      )
    ] })
  ] });
}
function Welcome({ AllEvents }) {
  useState("");
  const [events, setEvents] = useState(AllEvents);
  useState("");
  useState("");
  useState("");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 opacity-5", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0ZM30 45C21.7157 45 15 38.2843 15 30C15 21.7157 21.7157 15 30 15C38.2843 15 45 21.7157 45 30C45 38.2843 38.2843 45 30 45Z' fill='%23EA580C' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px"
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen flex flex-col items-center justify-center px-4 my-16", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.2 },
          className: "text-center max-w-4xl mx-auto",
          children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { scale: 0.9 },
                animate: { scale: 1 },
                transition: { duration: 0.5 },
                className: "mb-8",
                children: [
                  /* @__PURE__ */ jsx("h1", { className: "text-6xl md:text-7xl font-bold text-orange-600 mb-4", children: "Touch Grass DC" }),
                  /* @__PURE__ */ jsx("div", { className: "h-1 w-24 bg-orange-500 mx-auto rounded-full" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.3 },
                className: "text-2xl md:text-3xl text-gray-700 mb-8 font-light",
                children: "Welcome to a grass roots social club trying to make DC less lonely, with events and activities to do without the need to doom scroll."
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.5 },
                className: "text-2xl md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto",
                children: "Making friends and finding things to do in DC"
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.7 },
                className: "flex flex-col sm:flex-row gap-4 justify-center mb-16",
                children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("register"),
                      className: "px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition shadow-lg hover:shadow-xl",
                      children: "Join the Club"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("login"),
                      className: "px-8 py-4 bg-white text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transform hover:scale-105 transition shadow-lg hover:shadow-xl",
                      children: "Sign In"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(EventSwiper, {}) }),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.8 },
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16",
                children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-8 text-center", children: "Upcoming Events" }),
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-8 text-center", children: [
                    " There are ",
                    events.length,
                    " events"
                  ] })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.1 },
          className: "absolute bottom-8 text-center text-gray-500",
          children: /* @__PURE__ */ jsx("p", { children: "Available in Washington, DC and surrounding areas" })
        }
      )
    ] })
  ] });
}
export {
  Welcome as default
};
