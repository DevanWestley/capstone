"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import FixLayout from "../../../components/FixLayout.jsx";

const Stars = ({ rating = 0, interactive = false, onRatingChange = null }) => {
  const r = Math.max(0, Math.min(5, Number(rating || 0)));

  const handleStarClick = (index) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={
            i < Math.round(r)
              ? "/assets/icons/star-filled.png"
              : "/assets/icons/star-empty.png"
          }
          alt="star"
          className={`w-6 h-6 ${
            interactive
              ? "cursor-pointer hover:scale-110 transition-transform"
              : ""
          }`}
          onClick={() => handleStarClick(i)}
        />
      ))}
    </div>
  );
};

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Rating states
  const [userRating, setUserRating] = useState(0);
  const [isRatingMode, setIsRatingMode] = useState(false);

  // Comment states
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Nama Kelompok gacor kece anjay",
      text: "Lorem ipsum",
      date: "30 November 2025",
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Fetch project detail
  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    fetch(`/api/projects/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setLoading(false);
      });
  }, [projectId]);

  const handlePrevImage = () => {
    if (project?.images?.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (project?.images?.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleRatingClick = () => {
    if (userRating === 0) {
      alert("Silakan pilih rating terlebih dahulu!");
      return;
    }

    console.log("Rating submitted:", userRating);
    alert(`Rating ${userRating} bintang berhasil dikirim!`);
    setIsRatingMode(false);
    setUserRating(0);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "User Current",
        text: newComment,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleReply = (commentId) => {
    if (replyText.trim()) {
      const reply = {
        id: Date.now(),
        author: "User Current",
        text: replyText,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };

      setComments(
        comments.map((c) =>
          c.id === commentId
            ? { ...c, replies: [...(c.replies || []), reply] }
            : c
        )
      );

      setReplyText("");
      setReplyTo(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A74]"></div>
          <p className="text-gray-500 mt-4">Memuat detail capstone...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Capstone tidak ditemukan</p>
          <button
            onClick={() => router.push("/katalog")}
            className="mt-4 px-6 py-2 bg-[#004A74] text-white rounded-lg hover:bg-[#003d5e] transition"
          >
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  const currentImage =
    project.images?.[selectedImageIndex] || project.thumbnail;

  return (
    <FixLayout>
      <div className="min-h-screen bg-[#FCFCFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <span
              className="hover:text-[#004A74] cursor-pointer"
              onClick={() => router.push("/")}
            >
              Homepage
            </span>
            <span>›</span>
            <span
              className="hover:text-[#004A74] cursor-pointer"
              onClick={() => router.push("/katalog")}
            >
              Katalog
            </span>
            <span>›</span>
            <span className="text-[#004A74] font-semibold line-clamp-1">
              {project.title}
            </span>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 mb-12">
            {/* Left: Hero Image Gallery */}
            <div className="space-y-4">
              {/* Main Hero Image with Overlay */}
              <div className="relative rounded-lg overflow-hidden h-[400px] group">
                <img
                  src={currentImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Navigation Arrows */}
                {project.images?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 shadow-lg transition opacity-0 group-hover:opacity-100"
                    >
                      <svg
                        className="w-6 h-6 text-[#004A74]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 shadow-lg transition opacity-0 group-hover:opacity-100"
                    >
                      <svg
                        className="w-6 h-6 text-[#004A74]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Dot Indicators at Bottom */}
                {project.images?.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          selectedImageIndex === idx
                            ? "bg-[#FED400] w-6"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.images?.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                      selectedImageIndex === idx
                        ? "border-[#004A74]"
                        : "border-gray-200 hover:border-[#004A74]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Project Info */}
            <div className="space-y-6">
              {/* Title Section */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#004A74] mb-3">
                  {project.title}
                </h1>

                {/* Category Badge */}
                <div className="mb-0">
                  <span className="inline-block text-lg font-regular text-[#004A74] py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Group Name */}
                <p className="text-md text-gray-600 mb-2 font-regular">
                  {project.group}
                </p>

                {/* Rating Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Stars rating={project.rating} />
                      <span className="text-sm text-gray-500">
                        ({Math.floor(project.rating * 3.4)})
                      </span>
                    </div>

                    <button
                      onClick={() => setIsRatingMode(!isRatingMode)}
                      className="text-sm text-[#004A74] hover:underline font-semibold"
                    >
                      kirim rating
                    </button>
                  </div>

                  {/* Interactive Rating Box */}
                  {isRatingMode && (
                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 mt-3">
                      <p className="text-sm font-semibold text-[#004A74] mb-3">
                        Pilih rating Anda:
                      </p>
                      <div className="flex items-center gap-4 mb-3">
                        <Stars
                          rating={userRating}
                          interactive={true}
                          onRatingChange={setUserRating}
                        />
                        {userRating > 0 && (
                          <span className="text-sm text-gray-600 font-medium">
                            {userRating} bintang
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleRatingClick}
                          disabled={userRating === 0}
                          className="px-4 py-2 bg-[#004A74] text-white text-sm font-semibold rounded-lg hover:bg-[#003d5e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Kirim Rating
                        </button>
                        <button
                          onClick={() => {
                            setIsRatingMode(false);
                            setUserRating(0);
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                {project.availableForContinuation ? (
                  <div className="flex items-center gap-2 text-green-600 text-md mb-4">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">
                      Terbuka untuk dilanjutkan
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 text-md mb-4">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">Sudah dilanjutkan</span>
                  </div>
                )}

                {/* Request Button */}
                {project.availableForContinuation && (
                  <button
                    onClick={() => router.push(`/detail/${project.id}/request`)}
                    className="w-full py-3 bg-[#004A74] text-white font-semibold rounded-lg hover:bg-[#003d5e] transition shadow-lg"
                  >
                    Kirim Request
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            {/* Deskripsi Capstone */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#004A74] mb-2 pb-2 border-b-2 border-[#FED400] inline-block">
                Deskripsi Capstone
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify mt-2">
                {project.description}
              </p>
            </div>

            {/* Evaluasi Capstone */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#004A74] mb-2 pb-2 border-b-2 border-[#FED400] inline-block">
                Evaluasi Capstone
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify mt-2">
                {project.evaluation}
              </p>
            </div>

            {/* Saran Pengembangan */}
            <div>
              <h2 className="text-xl font-bold text-[#004A74] mb-2 pb-2 border-b-2 border-[#FED400] inline-block">
                Saran Pengembangan
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify mt-2">
                {project.developmentSuggestion}
              </p>
            </div>
          </div>

          {/* Anggota Kelompok */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#004A74]">
                Anggota Kelompok
              </h2>
              <button className="px-4 py-2 border border-[#004A74] text-[#004A74] font-semibold rounded-lg hover:bg-blue-50 transition text-sm">
                Detail Kelompok
              </button>
            </div>

            <div className="flex gap-8 flex-wrap">
              {[1, 2, 3, 4, 5].map((member) => (
                <div key={member} className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 mx-auto"></div>
                  <p className="text-sm text-gray-600">Anggota {member}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Komentar Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#004A74]">
                Komentar ({comments.length})
              </h2>
            </div>

            {/* Add Comment Form */}
            <div className="mb-6">
              <textarea
                id="comment-textarea"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar Anda..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004A74] focus:ring-1 focus:ring-[#004A74] resize-none"
                rows="3"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-6 py-2 bg-[#004A74] text-white font-semibold rounded-lg hover:bg-[#003d5e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Kirim Komentar
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-200 pb-6 last:border-0"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-[#004A74]">
                            {comment.author}
                          </p>
                          <p className="text-xs text-gray-500">
                            {comment.date}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.text}</p>

                      <button
                        onClick={() => setReplyTo(comment.id)}
                        className="text-sm text-[#004A74] hover:underline flex items-center gap-1"
                      >
                        Reply
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>

                      {/* Reply Form */}
                      {replyTo === comment.id && (
                        <div className="mt-4 ml-8">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Tulis balasan..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#004A74] resize-none text-sm"
                            rows="2"
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleReply(comment.id)}
                              className="px-4 py-1.5 bg-[#004A74] text-white text-sm rounded-lg hover:bg-[#003d5e] transition"
                            >
                              Kirim
                            </button>
                            <button
                              onClick={() => {
                                setReplyTo(null);
                                setReplyText("");
                              }}
                              className="px-4 py-1.5 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies?.length > 0 && (
                        <div className="mt-4 ml-8 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <p className="font-semibold text-[#004A74] text-sm">
                                    {reply.author}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {reply.date}
                                  </p>
                                </div>
                                <p className="text-gray-700 text-sm">
                                  {reply.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FixLayout>
  );
}
