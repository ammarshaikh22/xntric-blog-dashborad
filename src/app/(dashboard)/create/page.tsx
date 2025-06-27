"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Upload, X } from "lucide-react"

interface ListItem {
  title: string
  description: string
}

interface List {
  listTitle: string
  listDescription: string
  items: ListItem[]
}

interface Subsection {
  subtitle: string
  subdescription: string[]
  lists: List[]
}

interface FAQ {
  question: string
  answer: string
}

interface BlogPost {
  title: string
  description: string
  category: string
  imageURL: string
  bannerImageURL: string
  quotes: string
  conclusion: string
  subsections: Subsection[]
  faqs: FAQ[]
  slug: string
}

const categories = [
  "Development",
  "Design",
  "Marketing",
  "Business",
  "Education",
  "Lifestyle",
  "Artificial Intelligence",
  "Branding",
]

export default function CreateBlogPage() {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    description: "",
    category: "",
    imageURL: "",
    bannerImageURL: "",
    quotes: "",
    conclusion: "",
    subsections: [],
    faqs: [],
    slug: "",
  })

  const generateSlug = (title: string) => {
    return title
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  }

  const handleTitleChange = (title: string) => {
    setBlogPost((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const addSubsection = () => {
    if (blogPost.subsections.length < 12) {
      setBlogPost((prev) => ({
        ...prev,
        subsections: [
          ...prev.subsections,
          {
            subtitle: "",
            subdescription: [""],
            lists: [],
          },
        ],
      }))
    }
  }

  const updateSubsection = (index: number, field: keyof Subsection, value: any) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) => (i === index ? { ...sub, [field]: value } : sub)),
    }))
  }

  const removeSubsection = (index: number) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.filter((_, i) => i !== index),
    }))
  }

  const addSubdescription = (subsectionIndex: number) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex ? { ...sub, subdescription: [...sub.subdescription, ""] } : sub,
      ),
    }))
  }

  const updateSubdescription = (subsectionIndex: number, descIndex: number, value: string) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex
          ? {
              ...sub,
              subdescription: sub.subdescription.map((desc, j) => (j === descIndex ? value : desc)),
            }
          : sub,
      ),
    }))
  }

  const removeSubdescription = (subsectionIndex: number, descIndex: number) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex
          ? {
              ...sub,
              subdescription: sub.subdescription.filter((_, j) => j !== descIndex),
            }
          : sub,
      ),
    }))
  }

  const addList = (subsectionIndex: number) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex
          ? {
              ...sub,
              lists: [
                ...sub.lists,
                {
                  listTitle: "",
                  listDescription: "",
                  items: [],
                },
              ],
            }
          : sub,
      ),
    }))
  }

  const updateList = (subsectionIndex: number, listIndex: number, field: keyof List, value: any) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex
          ? {
              ...sub,
              lists: sub.lists.map((list, j) => (j === listIndex ? { ...list, [field]: value } : list)),
            }
          : sub,
      ),
    }))
  }

  const removeList = (subsectionIndex: number, listIndex: number) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex
          ? {
              ...sub,
              lists: sub.lists.filter((_, j) => j !== listIndex),
            }
          : sub,
      ),
    }))
  }

  const addListItem = (subsectionIndex: number, listIndex: number) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex
          ? {
              ...sub,
              lists: sub.lists.map((list, j) =>
                j === listIndex
                  ? {
                      ...list,
                      items: [...list.items, { title: "", description: "" }],
                    }
                  : list,
              ),
            }
          : sub,
      ),
    }))
  }

  const updateListItem = (
    subsectionIndex: number,
    listIndex: number,
    itemIndex: number,
    field: keyof ListItem,
    value: string,
  ) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex
          ? {
              ...sub,
              lists: sub.lists.map((list, j) =>
                j === listIndex
                  ? {
                      ...list,
                      items: list.items.map((item, k) => (k === itemIndex ? { ...item, [field]: value } : item)),
                    }
                  : list,
              ),
            }
          : sub,
      ),
    }))
  }

  const removeListItem = (subsectionIndex: number, listIndex: number, itemIndex: number) => {
    setBlogPost((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub, i) =>
        i === subsectionIndex
          ? {
              ...sub,
              lists: sub.lists.map((list, j) =>
                j === listIndex
                  ? {
                      ...list,
                      items: list.items.filter((_, k) => k !== itemIndex),
                    }
                  : list,
              ),
            }
          : sub,
      ),
    }))
  }

  const addFAQ = () => {
    setBlogPost((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }))
  }

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    setBlogPost((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    }))
  }

  const removeFAQ = (index: number) => {
    setBlogPost((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Blog post data:", blogPost)
    // Here you would typically send the data to your API
  }

  return (
    <div className="min-h-screen bg-[#020816] text-white">
      <div className="container mx-auto px-4 py-8 max-w-[90%]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Post</h1>
          <p className="text-slate-400">Write and manage all of your blog posts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-transparent border-[#161C2A] border">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-200">
                    Post Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title"
                    value={blogPost.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-200">
                    Category
                  </Label>
                  <Select
                    value={blogPost.category}
                    onValueChange={(value) => setBlogPost((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-transparent border-[#161C2A] border  text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white hover:bg-slate-600">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-200">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Write your post content"
                  value={blogPost.description}
                  onChange={(e) => setBlogPost((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400 min-h-32"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-slate-200">
                  Slug
                </Label>
                <Input
                  id="slug"
                  placeholder="post-slug"
                  value={blogPost.slug}
                  onChange={(e) => setBlogPost((prev) => ({ ...prev, slug: e.target.value }))}
                  className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="bg-transparent border-[#161C2A] border">
            <CardHeader>
              <CardTitle className="text-white">Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="imageURL" className="text-slate-200">
                  Featured Image URL
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="imageURL"
                    placeholder="https://example.com/image.jpg"
                    value={blogPost.imageURL}
                    onChange={(e) => setBlogPost((prev) => ({ ...prev, imageURL: e.target.value }))}
                    className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className=" border-[#161C2A] border text-slate-200 hover:bg-slate-700 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bannerImageURL" className="text-slate-200">
                  Banner Image URL
                </Label>
                 <div className="flex items-center space-x-4">
                  <Input
                    id="bannerImageURL"
                    placeholder="https://example.com/image.jpg"
                    value={blogPost.bannerImageURL}
                  onChange={(e) => setBlogPost((prev) => ({ ...prev, bannerImageURL: e.target.value }))}
                  className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className=" border-[#161C2A] border text-slate-200 hover:bg-slate-700 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Content */}
          <Card className="bg-transparent border-[#161C2A] border">
            <CardHeader>
              <CardTitle className="text-white">Additional Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quotes" className="text-slate-200">
                  Quotes (Optional)
                </Label>
                <Textarea
                  id="quotes"
                  placeholder="Add inspiring quotes related to your post"
                  value={blogPost.quotes}
                  onChange={(e) => setBlogPost((prev) => ({ ...prev, quotes: e.target.value }))}
                  className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conclusion" className="text-slate-200">
                  Conclusion (Optional)
                </Label>
                <Textarea
                  id="conclusion"
                  placeholder="Write your conclusion"
                  value={blogPost.conclusion}
                  onChange={(e) => setBlogPost((prev) => ({ ...prev, conclusion: e.target.value }))}
                  className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Subsections */}
          <Card className="bg-transparent border-[#161C2A] border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Subsections</CardTitle>
              <Button
                type="button"
                onClick={addSubsection}
                disabled={blogPost.subsections.length >= 12}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subsection
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {blogPost.subsections.map((subsection, subsectionIndex) => (
                <div key={subsectionIndex} className="border border-slate-600 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Subsection {subsectionIndex + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeSubsection(subsectionIndex)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-200">Sub Heading</Label>
                    <Input
                      placeholder="Enter subsection title"
                      value={subsection.subtitle}
                      onChange={(e) => updateSubsection(subsectionIndex, "subtitle", e.target.value)}
                      className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-slate-200">Sub Descriptions</Label>
                      <Button
                        type="button"
                        onClick={() => addSubdescription(subsectionIndex)}
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-[#161C2A] border text-slate-200 hover:bg-slate-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Description
                      </Button>
                    </div>
                    {subsection.subdescription.map((desc, descIndex) => (
                      <div key={descIndex} className="flex items-center space-x-2">
                        <Textarea
                          placeholder="Enter sub description"
                          value={desc}
                          onChange={(e) => updateSubdescription(subsectionIndex, descIndex, e.target.value)}
                          className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                        />
                        {subsection.subdescription.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeSubdescription(subsectionIndex, descIndex)}
                            variant="destructive"
                            size="sm"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Lists */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-slate-200">Lists</Label>
                      <Button
                        type="button"
                        onClick={() => addList(subsectionIndex)}
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-[#161C2A] border text-slate-200 hover:bg-slate-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add List
                      </Button>
                    </div>
                    {subsection.lists.map((list, listIndex) => (
                      <div key={listIndex} className="bg-transparent border-[#161C2A] border rounded p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-white">List {listIndex + 1}</h4>
                          <Button
                            type="button"
                            onClick={() => removeList(subsectionIndex, listIndex)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            placeholder="List title"
                            value={list.listTitle}
                            onChange={(e) => updateList(subsectionIndex, listIndex, "listTitle", e.target.value)}
                            className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                            required
                          />
                          <Input
                            placeholder="List description (optional)"
                            value={list.listDescription}
                            onChange={(e) => updateList(subsectionIndex, listIndex, "listDescription", e.target.value)}
                            className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-slate-200 text-sm">List Items</Label>
                            <Button
                              type="button"
                              onClick={() => addListItem(subsectionIndex, listIndex)}
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-[#161C2A] border hover:bg-slate-700"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add Item
                            </Button>
                          </div>
                          {list.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-2">
                              <Input
                                placeholder="Item title"
                                value={item.title}
                                onChange={(e) =>
                                  updateListItem(subsectionIndex, listIndex, itemIndex, "title", e.target.value)
                                }
                                className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                                required
                              />
                              <Input
                                placeholder="Item description (optional)"
                                value={item.description}
                                onChange={(e) =>
                                  updateListItem(subsectionIndex, listIndex, itemIndex, "description", e.target.value)
                                }
                                className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                              />
                              <Button
                                type="button"
                                onClick={() => removeListItem(subsectionIndex, listIndex, itemIndex)}
                                variant="destructive"
                                size="sm"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-transparent border-[#161C2A] border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">FAQs</CardTitle>
              <Button type="button" onClick={addFAQ} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {blogPost.faqs.map((faq, index) => (
                <div key={index} className="bg-transparent border-[#161C2A] border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">FAQ {index + 1}</h3>
                    <Button type="button" onClick={() => removeFAQ(index)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-200">Question</Label>
                    <Input
                      placeholder="Enter the question"
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, "question", e.target.value)}
                      className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-200">Answer</Label>
                    <Textarea
                      placeholder="Enter the answer"
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                      className="bg-transparent border-[#161C2A] border text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
              Publish Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
