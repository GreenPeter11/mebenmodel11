// This file defines the About page that helps build trust with visitors and explain who runs the training center.
// It belongs to the public information pages and is accessible at the /about route.

// ============================
// Imports
// ============================
"use client";

import { motion } from "framer-motion";
import { Users, Target, Award, Heart, Lightbulb, Handshake } from "lucide-react";
import { Button } from "@/components/Button";

// ============================
// Main logic
// ============================

// The About page explains who we are, our approach to practical training,
// and the mission and values that guide our work, presented with premium design.

// ============================
// UI sections
// ============================

export default function AboutPage() {
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
              About Our Training Center
            </motion.p>
            <motion.h1
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A Training Center Built for
              <br />
              <span className="text-indigo-200">Real People and Real Work</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-indigo-100 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We offer practical training programs that focus on skills people can
              use the same day in their jobs, businesses, and communities. Our
              approach is simple: small groups, clear language, and hands-on
              practice.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================
          Who we are section
         ============================ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              className="rounded-2xl bg-white p-8 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Who We Are
              </h2>
              <p className="mb-4 text-lg leading-7 text-gray-600">
                The training center is led by a small team of trainers and
                coordinators with experience in Business, IT, and Agriculture. We
                have worked in classrooms, community programs, and private
                organizations, and we bring that experience into every course.
              </p>
              <p className="text-lg leading-7 text-gray-600">
                Our team believes in using simple examples and real stories. We plan
                each session so that people with different backgrounds can follow
                along, ask questions, and feel confident to try things on their own.
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl bg-gray-50 p-8 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3 text-purple-600">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                How We Work With Partners
              </h3>
              <p className="text-lg leading-7 text-gray-600">
                We often work with schools, local organizations, and workplaces to
                design training that fits their people. This might mean adjusting
                timing, examples, or language so that the sessions feel relevant and
                respectful.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================
          Practical training focus section
         ============================ */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Practical, Physical Training First
            </h2>
            <p className="mb-8 text-lg leading-7 text-gray-600">
              Our focus is on physical, in-person training where people can see,
              touch, and try what they are learning. We use real tools, real
              examples, and simple practice activities to make sure ideas become
              skills.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Guided Practice",
                description:
                  "Short explanations followed by hands-on guided practice sessions.",
              },
              {
                title: "Take-Home Resources",
                description:
                  "Clear worksheets, checklists, and templates people can use after training.",
              },
              {
                title: "Personal Support",
                description:
                  "Trainers who move around the room and give one-on-one support.",
              },
              {
                title: "Reflection Time",
                description:
                  "Time for questions, reflection, and planning next steps.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          Mission and values section
         ============================ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3 text-purple-600">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Mission and Values
            </h2>
            <p className="mb-12 text-lg leading-7 text-gray-600">
              Our mission is to help people build skills that open doors: to better
              work, stronger businesses, and more stable communities. We design
              training that feels welcoming, practical, and worth the time.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Award,
                title: "Clarity",
                description:
                  "We use clear language and simple tools so that people can focus on understanding, not on jargon.",
                color: "indigo",
              },
              {
                icon: Heart,
                title: "Respect",
                description:
                  "We respect the time, culture, and experience of every learner and partner we work with.",
                color: "purple",
              },
              {
                icon: Target,
                title: "Practical Impact",
                description:
                  "We measure success by what people can do differently after a course, not just by what was covered.",
                color: "pink",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              const colorClasses = {
                indigo: "bg-indigo-100 text-indigo-600",
                purple: "bg-purple-100 text-purple-600",
                pink: "bg-pink-100 text-pink-600",
              };

              return (
                <motion.div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className={`mb-4 inline-flex rounded-xl p-3 ${colorClasses[value.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
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
              Join our community of learners transforming their careers
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
                href="/contact"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
