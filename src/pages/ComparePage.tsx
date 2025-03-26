import React, { useState } from "react";
import { motion } from "framer-motion";
import { pcBuilds, componentTypes, PCBuild } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  CheckCircle2, 
  Download, 
  Printer, 
  Star, 
  Trash, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock comparison builds
const comparisonBuilds = [pcBuilds[0], pcBuilds[1]];

const ComparePage = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [selectedBuilds, setSelectedBuilds] = useState<PCBuild[]>(comparisonBuilds);
  const [availableBuilds, setAvailableBuilds] = useState<PCBuild[]>(
    pcBuilds.filter((build) => !selectedBuilds.some((sb) => sb.id === build.id))
  );
  const [activeBuilds, setActiveBuilds] = useState<PCBuild[]>(
    isMobile && selectedBuilds.length > 1 ? [selectedBuilds[0], selectedBuilds[1]] : selectedBuilds
  );
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  const handleAddBuild = (buildId: string) => {
    const buildToAdd = pcBuilds.find((build) => build.id === buildId);
    if (buildToAdd && selectedBuilds.length < 3) {
      const newSelectedBuilds = [...selectedBuilds, buildToAdd];
      setSelectedBuilds(newSelectedBuilds);
      setAvailableBuilds(availableBuilds.filter((build) => build.id !== buildId));
      if (isMobile) {
        setActiveBuilds([newSelectedBuilds[0], buildToAdd]);
      } else {
        setActiveBuilds(newSelectedBuilds);
      }
    }
  };

  const handleRemoveBuild = (buildId: string) => {
    const buildToRemove = selectedBuilds.find((build) => build.id === buildId);
    if (buildToRemove) {
      const newSelectedBuilds = selectedBuilds.filter((build) => build.id !== buildId);
      setSelectedBuilds(newSelectedBuilds);
      setAvailableBuilds([...availableBuilds, buildToRemove]);
      
      if (isMobile && newSelectedBuilds.length > 1) {
        setActiveBuilds([newSelectedBuilds[0], newSelectedBuilds[1]]);
        setCurrentPairIndex(0);
      } else {
        setActiveBuilds(newSelectedBuilds);
      }
    }
  };

  const handlePrint = () => {
    toast({
      title: "Printing",
      description: "Preparing comparison data for printing.",
      variant: "default",
    });
    // In a real app, this would trigger the browser's print functionality
  };

  const handleDownload = () => {
    toast({
      title: "Downloading",
      description: "Comparison data is being downloaded.",
      variant: "default",
    });
    // In a real app, this would generate and download a file
  };

  const showNextPair = () => {
    if (selectedBuilds.length <= 2) return;
    
    const nextIndex = (currentPairIndex + 1) % (selectedBuilds.length - 1);
    setCurrentPairIndex(nextIndex);
    setActiveBuilds([selectedBuilds[0], selectedBuilds[nextIndex + 1]]);
  };

  const showPrevPair = () => {
    if (selectedBuilds.length <= 2) return;
    
    const prevIndex = (currentPairIndex - 1 + (selectedBuilds.length - 1)) % (selectedBuilds.length - 1);
    setCurrentPairIndex(prevIndex);
    setActiveBuilds([selectedBuilds[0], selectedBuilds[prevIndex + 1]]);
  };

  const canNavigate = selectedBuilds.length > 2;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-bold">Compare PC Builds</h1>
        <p className="text-muted-foreground">
          Compare different PC builds side by side to find the perfect match for your needs
        </p>
      </motion.div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Build Comparison</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {selectedBuilds.length < 3 && (
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Label htmlFor="build-select" className="text-sm whitespace-nowrap">
                  Add Build:
                </Label>
                <Select
                  onValueChange={(value) => handleAddBuild(value)}
                  disabled={availableBuilds.length === 0}
                >
                  <SelectTrigger id="build-select" className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select a build" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBuilds.map((build) => (
                      <SelectItem key={build.id} value={build.id}>
                        {build.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {selectedBuilds.length > 0 ? (
        <>
          {/* Desktop View */}
          {!isMobile && (
            <div className="overflow-x-auto hidden md:block">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))] gap-4">
                  {/* Header */}
                  <div className="pt-16">{/* Empty cell for category labels */}</div>

                  {selectedBuilds.map((build, index) => (
                    <motion.div
                      key={build.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="border-2 border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => handleRemoveBuild(build.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="aspect-video rounded-md overflow-hidden mb-3">
                            <img
                              src={build.image}
                              alt={build.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardTitle className="text-lg">{build.name}</CardTitle>
                          <CardDescription>{build.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="font-medium">{build.rating}</span>
                            </div>
                            <span className="font-bold text-lg">
                              ${build.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary">{build.category}</Badge>
                            {build.purpose.map((tag) => (
                              <Badge key={tag} variant="outline" className="capitalize">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Component Comparisons */}
                  {componentTypes.map((type) => (
                    <React.Fragment key={type.id}>
                      <div className="bg-muted/50 p-4 rounded-lg font-medium sticky left-0 z-10">
                        {type.name}
                      </div>

                      {selectedBuilds.map((build) => {
                        const component = build.components.find((c) => c.type === type.id);
                        return (
                          <Card key={`${build.id}-${type.id}`} className="overflow-hidden">
                            {component ? (
                              <div className="p-4">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                                    <img
                                      src={component.image}
                                      alt={component.name}
                                      className="w-8 h-8 object-contain"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm">{component.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {component.brand}
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1 text-xs">
                                  {Object.entries(component.specs).slice(0, 4).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="text-muted-foreground capitalize">
                                        {key.replace(/([A-Z])/g, " $1").trim()}:
                                      </span>
                                      <span className="font-medium">{value}</span>
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-2 text-sm font-bold text-right">
                                  ${component.price}
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 h-full flex items-center justify-center text-muted-foreground italic text-sm">
                                Not included
                              </div>
                            )}
                          </Card>
                        );
                      })}
                    </React.Fragment>
                  ))}

                  {/* Price Summary */}
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg font-medium sticky left-0 z-10">
                    Total Price
                  </div>

                  {selectedBuilds.map((build) => (
                    <Card key={`${build.id}-total`} className="bg-primary text-primary-foreground">
                      <div className="p-4 flex items-center justify-center">
                        <div className="text-xl font-bold">${build.price.toLocaleString()}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile View */}
          {isMobile && (
            <div className="md:hidden">
              {/* Navigation controls for mobile */}
              {canNavigate && (
                <div className="flex items-center justify-between mb-4">
                  <Button variant="outline" size="sm" onClick={showPrevPair} disabled={!canNavigate}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Comparing with {selectedBuilds[currentPairIndex + 1]?.name}
                  </span>
                  <Button variant="outline" size="sm" onClick={showNextPair} disabled={!canNavigate}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Mobile comparison view */}
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                </TabsList>

                <TabsContent value="summary">
                  <div className="space-y-4">
                    {/* Build Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {activeBuilds.map((build) => (
                        <Card key={build.id} className="overflow-hidden">
                          <div className="absolute top-1 right-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleRemoveBuild(build.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                          <CardHeader className="p-3">
                            <div className="aspect-video rounded-sm overflow-hidden mb-2">
                              <img
                                src={build.image}
                                alt={build.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardTitle className="text-sm">{build.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 pt-0">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                                <span>{build.rating}</span>
                              </div>
                              <span className="font-bold">${build.price}</span>
                            </div>
                            <Badge variant="outline" className="text-xs px-1 py-0">{build.category}</Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Key Components Comparison */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Component</TableHead>
                          {activeBuilds.map((build) => (
                            <TableHead key={build.id} className="text-right">
                              {build.name}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {componentTypes.slice(0, 5).map((type) => (
                          <TableRow key={type.id}>
                            <TableCell className="font-medium">{type.name}</TableCell>
                            {activeBuilds.map((build) => {
                              const component = build.components.find(c => c.type === type.id);
                              return (
                                <TableCell key={`${build.id}-${type.id}`} className="text-right">
                                  {component ? (
                                    <div className="text-xs font-medium">
                                      {component.name.length > 15 
                                        ? `${component.name.substring(0, 15)}...` 
                                        : component.name}
                                    </div>
                                  ) : (
                                    <span className="text-xs italic text-muted-foreground">Not included</span>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Price</TableCell>
                          {activeBuilds.map((build) => (
                            <TableCell key={`${build.id}-price`} className="text-right font-bold">
                              ${build.price}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="detailed">
                  {componentTypes.map((type) => (
                    <Card key={type.id} className="mb-4">
                      <CardHeader className="py-2 px-3 bg-muted/50">
                        <CardTitle className="text-sm">{type.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="grid grid-cols-2 divide-x">
                          {activeBuilds.map((build) => {
                            const component = build.components.find(c => c.type === type.id);
                            return (
                              <div key={`${build.id}-${type.id}`} className="p-3">
                                {component ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                                        <img
                                          src={component.image}
                                          alt={component.name}
                                          className="w-6 h-6 object-contain"
                                        />
                                      </div>
                                      <div>
                                        <div className="text-xs font-medium">{component.name}</div>
                                        <div className="text-xs text-muted-foreground">{component.brand}</div>
                                      </div>
                                    </div>
                                    <div className="text-xs font-medium text-right">${component.price}</div>
                                  </div>
                                ) : (
                                  <div className="h-full flex items-center justify-center text-xs italic text-muted-foreground py-4">
                                    Not included
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="bg-primary text-primary-foreground mb-4">
                    <CardHeader className="py-2 px-3">
                      <CardTitle className="text-sm">Total Price</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="grid grid-cols-2 divide-x divide-primary-foreground/20">
                        {activeBuilds.map((build) => (
                          <div key={`${build.id}-total`} className="p-3 text-center">
                            <div className="text-lg font-bold">${build.price.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Builds to Compare</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Add PC builds to compare their components, specifications, and prices side by side.
          </p>
          {availableBuilds.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Label htmlFor="empty-build-select" className="sr-only">
                Add Build
              </Label>
              <Select onValueChange={(value) => handleAddBuild(value)}>
                <SelectTrigger id="empty-build-select" className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select a build" />
                </SelectTrigger>
                <SelectContent>
                  {availableBuilds.map((build) => (
                    <SelectItem key={build.id} value={build.id}>
                      {build.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full sm:w-auto">Add to Compare</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComparePage;
