"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Smartphone,
  Zap,
  Star,
  ArrowRight,
  Download,
  Play,
  CheckCircle,
  Menu,
  X,
} from "lucide-react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("down")
  const [lastScrollY, setLastScrollY] = useState(0)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      setLastScrollY(currentScrollY)

      if (backgroundRef.current) {
        const scrollProgress = currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)
        const elements = backgroundRef.current.children

        Array.from(elements).forEach((element, index) => {
          const htmlElement = element as HTMLElement
          const speed = (index + 1) * 0.3
          const direction = scrollDirection === "down" ? 1 : -1
          const rotation = scrollProgress * 180 * direction * (index + 1)
          const scale = 1 + scrollProgress * 0.5
          const xMovement = Math.sin(scrollProgress * Math.PI * 4 + index) * 100
          const yMovement = currentScrollY * speed * direction

          htmlElement.style.transform = `
            translateY(${yMovement}px) 
            translateX(${xMovement}px)
            rotate(${rotation}deg) 
            scale(${scale})
          `
          htmlElement.style.opacity = `${0.3 + Math.sin(scrollProgress * Math.PI * 2 + index) * 0.4}`
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    setIsVisible(true)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, scrollDirection])

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border z-50 animate-slide-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="font-space-grotesk font-bold text-xl sm:text-2xl text-primary">Abedalrahman</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 lg:space-x-12">
              {["Home", "About", "Projects", "Services", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm lg:text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden md:flex space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                CV
              </Button>
              <Button size="sm" className="gradient-primary">
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
              <div className="px-4 py-6 space-y-4">
                {["Home", "About", "Projects", "Services", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex space-x-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                  <Button size="sm" className="gradient-primary flex-1">
                    Contact Me
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Advanced Parallax */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
        style={{
          background: `linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)`,
        }}
      >
        <div ref={backgroundRef} className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float transition-all duration-1000" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-tl from-accent/15 to-primary/15 rounded-full blur-3xl animate-float transition-all duration-1000" />
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-2xl animate-float transition-all duration-1000" />
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-xl animate-float transition-all duration-1000" />
          <div className="absolute bottom-1/3 left-1/2 w-72 h-72 bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-2xl animate-float transition-all duration-1000" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-scale" : "opacity-0"}`}>
            <div className="relative mb-6 sm:mb-8">
              <div className="w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 mx-auto relative">
                <img
                  src="/professional-developer-portrait.png"
                  alt="Abedalrahman"
                  className="w-full h-full rounded-full object-cover border-2 sm:border-4 border-primary/20 animate-glow"
                />
                <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 sm:w-6 h-4 sm:h-6 bg-accent rounded-full animate-pulse" />
              </div>
            </div>

            <h1 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-4 sm:mb-6">
              <span className="text-foreground">Hello, I'm </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Abedalrahman
              </span>
            </h1>

            <div className="relative mb-6 sm:mb-8">
              <h2 className="font-space-grotesk text-lg sm:text-xl md:text-2xl lg:text-4xl text-muted-foreground mb-3 sm:mb-4">
                Innovating with Flutter
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm sm:text-base lg:text-lg text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  <span>Mobile Expert</span>
                </div>
                <div className="hidden sm:block w-2 h-2 bg-accent rounded-full" />
                <div className="flex items-center space-x-2">
                  <Code className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  <span>Flutter Specialist</span>
                </div>
                <div className="hidden sm:block w-2 h-2 bg-accent rounded-full" />
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  <span>Performance Focused</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
              <Button
                size="lg"
                className="gradient-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift group w-full sm:w-auto"
              >
                View My Work
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent w-full sm:w-auto"
              >
                <Download className="mr-2 w-4 sm:w-5 h-4 sm:h-5" />
                Download CV
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xs sm:max-w-md mx-auto">
              {[
                { number: "50+", label: "Projects" },
                { number: "3+", label: "Years" },
                { number: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-space-grotesk font-bold text-xl sm:text-2xl lg:text-3xl text-primary">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-primary rounded-full mt-1 sm:mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section with Timeline */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6">
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate Flutter developer with expertise in creating scalable, maintainable mobile applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column - Story */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="gradient-card border-0 hover-lift">
                <CardHeader>
                  <CardTitle className="font-space-grotesk text-xl sm:text-2xl text-card-foreground">
                    My Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    With years of experience in mobile development, I specialize in Flutter framework to create
                    cross-platform applications that don't compromise on performance or user experience. I'm passionate
                    about clean code, modern architecture patterns, and delivering solutions that exceed expectations.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {["Flutter", "Dart", "Firebase", "REST APIs", "State Management", "UI/UX Design"].map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-accent/20 text-accent-foreground hover:bg-accent/30 text-xs sm:text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Progress */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  { skill: "Flutter Development", level: 95 },
                  { skill: "UI/UX Design", level: 88 },
                  { skill: "Firebase Integration", level: 92 },
                  { skill: "API Development", level: 85 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground text-sm sm:text-base">{item.skill}</span>
                      <span className="text-primary font-bold text-sm sm:text-base">{item.level}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: Code, number: "50+", label: "Projects Completed", color: "text-primary" },
                { icon: Star, number: "3+", label: "Years Experience", color: "text-accent" },
                { icon: CheckCircle, number: "100%", label: "Client Satisfaction", color: "text-primary" },
                { icon: Zap, number: "24/7", label: "Support Available", color: "text-accent" },
              ].map((stat, index) => (
                <Card key={index} className="gradient-card border-0 hover-lift text-center">
                  <CardHeader className="pb-2">
                    <stat.icon className={`w-6 sm:w-8 h-6 sm:h-8 mx-auto ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="font-space-grotesk font-bold text-xl sm:text-2xl lg:text-3xl text-card-foreground mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Interactive Grid */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my recent work and the technologies I've mastered
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "E-Commerce App",
                description:
                  "Full-featured shopping app with payment integration, user authentication, and real-time inventory management.",
                tech: ["Flutter", "Firebase", "Stripe API"],
                image: "/mobile-ecommerce-app.png",
                featured: true,
              },
              {
                title: "Social Media Platform",
                description:
                  "Instagram-like social platform with photo sharing, stories, messaging, and social interactions.",
                tech: ["Flutter", "Node.js", "MongoDB"],
                image: "/social-media-app-interface.png",
                featured: false,
              },
              {
                title: "Fitness Tracker",
                description: "Health and fitness app with workout tracking, nutrition logging, and progress analytics.",
                tech: ["Flutter", "HealthKit", "Charts"],
                image: "/fitness-tracking-app.png",
                featured: false,
              },
            ].map((project, index) => (
              <Card
                key={index}
                className={`group hover-lift border-0 overflow-hidden ${
                  project.featured ? "sm:col-span-2 lg:col-span-1" : ""
                } gradient-card`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    size="sm"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="font-space-grotesk text-lg sm:text-xl text-card-foreground flex items-center justify-between">
                    {project.title}
                    <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-primary/20 text-primary text-xs sm:text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6">
              Services
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive Flutter development services to bring your ideas to life
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile App Development",
                description:
                  "Custom Flutter applications for iOS and Android with native performance and beautiful UI.",
                features: [
                  "Cross-platform development",
                  "Native performance",
                  "Custom UI/UX design",
                  "App store deployment",
                ],
              },
              {
                icon: Code,
                title: "API Integration",
                description:
                  "Seamless integration with REST APIs, GraphQL, and third-party services for dynamic functionality.",
                features: [
                  "REST API integration",
                  "GraphQL implementation",
                  "Third-party services",
                  "Real-time data sync",
                ],
              },
              {
                icon: Zap,
                title: "Maintenance & Support",
                description:
                  "Ongoing support, updates, and maintenance to keep your app running smoothly and up-to-date.",
                features: [
                  "Bug fixes & updates",
                  "Performance optimization",
                  "Feature enhancements",
                  "Technical support",
                ],
              },
            ].map((service, index) => (
              <Card key={index} className="gradient-card border-0 hover-lift h-full group">
                <CardHeader className="text-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                  </div>
                  <CardTitle className="font-space-grotesk text-lg sm:text-xl text-card-foreground">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 sm:space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-accent mr-2 sm:mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6">
              Get In Touch
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="gradient-card border-0 hover-lift">
                <CardHeader>
                  <CardTitle className="font-space-grotesk text-xl sm:text-2xl text-card-foreground">
                    Let's Connect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "abedalrahman@example.com" },
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: MapPin, label: "Location", value: "Available Worldwide" },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <contact.icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-card-foreground text-sm sm:text-base">{contact.label}</div>
                        <div className="text-muted-foreground text-sm sm:text-base">{contact.value}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover-lift border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <Github className="w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover-lift border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="gradient-card border-0 hover-lift">
              <CardHeader>
                <CardTitle className="font-space-grotesk text-xl sm:text-2xl text-card-foreground">
                  Send a Message
                </CardTitle>
                <CardDescription>I'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <Button className="w-full gradient-primary text-base sm:text-lg py-2 sm:py-3 hover-lift">
                  Send Message
                  <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-space-grotesk font-bold text-xl sm:text-2xl text-primary mb-3 sm:mb-4">
              Abedalrahman
            </div>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              © 2024 Abedalrahman. All rights reserved. Built with passion and Flutter.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="#home"
                className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
