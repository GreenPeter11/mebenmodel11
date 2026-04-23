// This file defines the Contact page that helps users reach the training center with questions or requests.
// It belongs to the public information pages and is accessible at the /contact route.

// ============================
// Imports
// ============================
"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";

// ============================
// Main logic
// ============================

// The Contact page shows direct contact details and a simple form
// that visitors can use to send a basic message, presented with premium design.

// ============================
// UI sections
// ============================

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
    }, 1000);
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      content: "+123 456 7890",
      description:
        "Call during office hours for quick questions about schedules and upcoming courses.",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@mebenmodel.com",
      description:
        "Use email if you prefer to send more detail or attach documents about your training needs.",
    },
    {
      icon: MapPin,
      title: "Physical Address",
      content: "Training Center Building\n123 Main Road\nCity, Country",
      description:
        "Sessions are usually held at this address unless a partner requests a different venue.",
    },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* ============================
          Hero section with gradient background
         ============================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-20 sm:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Contact Us
            </motion.p>
            <motion.h1
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We Are Ready to Talk About
              <br />
              <span className="text-indigo-200">Your Training Needs</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-indigo-100 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Use the details below or the simple form to reach our team. We will do
              our best to respond within two working days.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================
          Contact information section
         ============================ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the method that works best for you
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {method.title}
                  </h3>
                  <p className="mb-3 whitespace-pre-line text-lg font-medium text-gray-900">
                    {method.content}
                  </p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================
          Contact form section
         ============================ */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Send className="h-6 w-6" />
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600">
                Share a few details about your question or training idea. We will use
                this information to prepare a simple response or follow-up call.
              </p>
            </div>

            <motion.div
              className="rounded-2xl bg-white p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {formStatus === "success" ? (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 inline-flex rounded-full bg-green-100 p-3 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you within two
                    working days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-semibold text-gray-900"
                      >
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-gray-900"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Briefly describe your question or training idea"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-gray-500">
                      We will only use your contact details to reply to your message.
                    </p>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================
          CTA section
         ============================ */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Learning?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Explore our courses and find the perfect program for you
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/courses"
                variant="primary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Browse Courses
              </Button>
              <Button
                href="/about"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
