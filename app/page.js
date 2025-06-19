"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Volume2, SendHorizonal, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialVideos = [
  {
    id: 1,
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 12,
    comments: ["Awesome!", "Nice work"],
    user: "@ayush"
  },
  {
    id: 2,
    url: "https://www.w3schools.com/html/movie.mp4",
    likes: 8,
    comments: ["🔥", "Epic", "Cool bro"],
    user: "@john"
  }
];

export default function TikTak() {
  const [index, setIndex] = useState(0);
  const [videos, setVideos] = useState(initialVideos);
  const [newComment, setNewComment] = useState("");
  const fileInputRef = useRef(null);

  const currentVideo = videos[index];

  const handleScroll = (e) => {
    if (e.deltaY > 0 && index < videos.length - 1) {
      setIndex(index + 1);
    } else if (e.deltaY < 0 && index > 0) {
      setIndex(index - 1);
    }
  };

  const handleLike = () => {
    const updated = [...videos];
    updated[index].likes += 1;
    setVideos(updated);
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    const updated = [...videos];
    updated[index].comments.push(newComment);
    setVideos(updated);
    setNewComment("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const newVideo = {
      id: videos.length + 1,
      url,
      likes: 0,
      comments: [],
      user: "@you"
    };

    setVideos([newVideo, ...videos]);
    setIndex(0);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-black text-white relative"
      onWheel={handleScroll}
    >
      <motion.video
        key={currentVideo.id}
        src={currentVideo.url}
        autoPlay
        loop
        controls={false}
        className="w-full h-full object-cover absolute top-0 left-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-4">
        <div className="text-sm text-white/80 mb-1">{currentVideo.user}</div>
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" className="text-white" onClick={handleLike}>
            <Heart className="mr-1" /> {currentVideo.likes}
          </Button>
          <MessageCircle className="mr-1" /> {currentVideo.comments.length}
        </div>
        <div className="max-h-[80px] overflow-y-auto text-sm space-y-1">
          {currentVideo.comments.map((c, i) => (
            <p key={i}>💬 {c}</p>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-white/10 border border-white/20 text-white placeholder-white text-sm"
          />
          <Button size="icon" className="bg-pink-600" onClick={handleComment}>
            <SendHorizonal className="text-white w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button onClick={openFilePicker} className="bg-white/10 border border-white/30 text-white text-sm">
          <Upload className="w-4 h-4 mr-2" /> Upload Video
        </Button>
      </div>

      <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
        <Volume2 />
      </div>
    </div>
  );
}
