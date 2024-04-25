import { renderHook, act } from '@testing-library/react';

import { useMoviesContext } from '../../context/movies/MoviesContext';
import { useReviewForm } from './useReviewForm';

jest.mock('../../context/movies/MoviesContext', () => ({
  useMoviesContext: jest.fn(),
}));

describe('useReviewForm hook', () => {
  it('correctly initializes state', () => {
    // Mocking context hook return values
    (useMoviesContext as jest.Mock).mockReturnValue({
      selectMovie: jest.fn(),
      submitReview: jest.fn(),
    });

    const { result } = renderHook(() => useReviewForm());

    expect(result.current.message).toBe('');
    expect(result.current.review).toBe(0);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('resets form state when canceled', () => {
    const selectMovieMock = jest.fn();

    (useMoviesContext as jest.Mock).mockReturnValue({
      selectMovie: selectMovieMock,
      submitReview: jest.fn(),
    });

    const { result } = renderHook(() => useReviewForm());

    act(() => {
      result.current.setMessage('Test message');
      result.current.setReview(5);
    });

    act(() => {
      result.current.onCancel();
    });

    // Assert that form state is reset
    expect(result.current.message).toBe('');
    expect(result.current.review).toBe(0);
    expect(selectMovieMock).toHaveBeenCalledWith(undefined);
  });

  it('submits review and resets form state when submitted', async () => {
    const submitReviewMock = jest.fn().mockResolvedValue('');

    (useMoviesContext as jest.Mock).mockReturnValue({
      selectMovie: jest.fn(),
      submitReview: submitReviewMock,
    });

    const { result } = renderHook(() => useReviewForm());

    act(() => {
      result.current.setMessage('Test message');
      result.current.setReview(5);
    });

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(submitReviewMock).toHaveBeenCalledWith({ message: 'Test message', review: 5 });

    expect(result.current.message).toBe('');
    expect(result.current.review).toBe(0);
  });

  it('submits review but does not resets form state when request fails', async () => {
    const submitReviewMock = jest.fn().mockRejectedValue('Request failed');

    (useMoviesContext as jest.Mock).mockReturnValue({
      selectMovie: jest.fn(),
      submitReview: submitReviewMock,
    });

    const { result } = renderHook(() => useReviewForm());

    act(() => {
      result.current.setMessage('Test message');
      result.current.setReview(5);
    });

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(submitReviewMock).toHaveBeenCalledWith({ message: 'Test message', review: 5 });

    expect(result.current.message).toBe('Test message');
    expect(result.current.review).toBe(5);
  });
});
