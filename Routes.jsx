import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContentEditorPage from './pages/content-editor';
import Dashboard from './pages/dashboard';
import ContentScheduler from './pages/content-scheduler';
import ContentLibrary from './pages/content-library';
import ContentUpload from './pages/content-upload';
import PerformanceAnalytics from './pages/performance-analytics';
import PricingPlans from './pages/pricing-plans';
import AiUrlGenerator from './pages/ai-url-generator';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ContentEditorPage />} />
        <Route path="/content-editor" element={<ContentEditorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/content-scheduler" element={<ContentScheduler />} />
        <Route path="/content-library" element={<ContentLibrary />} />
        <Route path="/content-upload" element={<ContentUpload />} />
        <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
        <Route path="/pricing-plans" element={<PricingPlans />} />
        <Route path="/ai-url-generator" element={<AiUrlGenerator />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;