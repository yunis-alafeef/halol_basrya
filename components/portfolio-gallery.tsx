"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Eye, MessageCircle, X } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import type { ProjectItem } from "@/lib/db";
import type { SiteSettings } from "@/lib/settings";

interface PortfolioGalleryProps {
  projects: ProjectItem[];
  settings: SiteSettings;
}

export function PortfolioGallery({ projects, settings }: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  const categoryLabels: Record<string, string> = {
    all: "جميع الأعمال",
    "لوحات وحروف بارزة": "لوحات وحروف بارزة",
    "استندات وفعاليات": "أجنحة واستندات معارض",
    طباعة: "طباعة وهوية بصرية",
    "دروع وهدايا": "دروع تذكارية وهدايا"
  };

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const cleanWhatsapp = (settings.whatsapp || "").replace(/[^0-9]/g, "");

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="portfolio-filters-wrap">
        <div className="portfolio-filters">
          {categories.map((cat) => {
            const label = categoryLabels[cat] || cat;
            const count = cat === "all" ? projects.length : projects.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                className={`filter-pill-btn ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{label}</span>
                <span className="filter-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="portfolio-grid-modern">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="modern-project-card group cursor-pointer"
            onClick={() => setActiveProject(project)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveProject(project);
              }
            }}
          >
            <div className="card-image-box">
              <CoverImage src={project.imageUrl} alt={project.title} sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="card-hover-overlay">
                <span className="hover-view-btn">
                  <Eye size={16} />
                  <span>معاينة التفاصيل</span>
                </span>
              </div>
              {project.featured && (
                <span className="featured-card-badge">✦ عمل مميز</span>
              )}
            </div>

            <div className="card-info-box">
              <span className="card-category-tag">{project.category || "دعاية وإعلان"}</span>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description}</p>
              <div className="card-footer-action">
                <span className="text-link">
                  استعرض المواصفات <ArrowLeft size={14} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <h3>لا توجد أعمال في هذا التصنيف حاليًا</h3>
          <p>أعمال جديدة قيد التنفيذ وستظهر هنا قريبًا.</p>
        </div>
      )}

      {/* Lightbox / Details Modal */}
      {activeProject && (
        <div className="modal-overlay" onClick={() => setActiveProject(null)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveProject(null)}
              aria-label="إغلاق"
            >
              <X size={20} />
            </button>

            <div className="modal-content-grid">
              <div className="modal-image-col">
                <div className="modal-image-wrap">
                  <CoverImage src={activeProject.imageUrl} alt={activeProject.title} priority />
                </div>
              </div>

              <div className="modal-info-col">
                <span className="modal-tag">{activeProject.category || "مشروع إعلاني"}</span>
                <h2>{activeProject.title}</h2>
                <p className="modal-desc">{activeProject.description}</p>

                <div className="modal-specs-list">
                  <div className="modal-spec-item">
                    <Check size={16} className="text-gold" />
                    <span>خامات معتمدة مقاومة للحرارة والشمس</span>
                  </div>
                  <div className="modal-spec-item">
                    <Check size={16} className="text-gold" />
                    <span>تنفيذ وتجميع آلي بمصانعنا في الرياض</span>
                  </div>
                  <div className="modal-spec-item">
                    <Check size={16} className="text-gold" />
                    <span>تركيب ميداني بواسطة فنيين مرخصين</span>
                  </div>
                  <div className="modal-spec-item">
                    <Check size={16} className="text-gold" />
                    <span>شهادة ضمان سارية المفعول على الإنارة والتثبيت</span>
                  </div>
                </div>

                <div className="modal-actions-row">
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`مرحبًا، شاهدت نموذج عملكم (${activeProject.title}) في الموقع وأرغب في تنفيذ عمل مماثل لمشروعي.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-gold"
                  >
                    <MessageCircle size={17} />
                    <span>طلب عمل مماثل عبر واتساب</span>
                  </a>
                  <Link
                    href="/contact"
                    className="button button-outline"
                    onClick={() => setActiveProject(null)}
                  >
                    <span>طلب معاينة رسمية</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
